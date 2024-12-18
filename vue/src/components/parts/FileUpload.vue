<template>
  <div>
    <h1>Upload Video</h1>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadVideo" :disabled="isUploading">Upload</button>

    <div v-if="isUploading">
      <p>Uploading: {{ progress }}%</p>
      <progress :value="progress" max="100"></progress>
    </div>

    <div v-if="uploadError">
      <p style="color: red;">Error: {{ uploadError }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      isUploading: false,
      progress: 0,
      uploadError: null,
      uploadedSize: 0,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      this.uploadedSize = 0;
    },

    async uploadVideo() {
      if (!this.file) return;

      this.isUploading = true;
      this.uploadError = null;

      // Получаем размер уже загруженного файла (если это не первая загрузка)
      try {
        const response = await axios.get('http://localhost:3000/upload-status', {
          params: { filename: this.file.name },
        });
        this.uploadedSize = response.data.uploaded;
      } catch (err) {
        console.error('Failed to check upload status', err);
      }

      const chunkSize = 10 * 1024 * 1024; // 10MB
      const totalChunks = Math.ceil(this.file.size / chunkSize);
      let currentChunk = Math.floor(this.uploadedSize / chunkSize);

      const uploadChunk = async () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, this.file.size);
        const chunk = this.file.slice(start, end);

        const formData = new FormData();
        formData.append('video', chunk, this.file.name);

        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.lengthComputable) {
                this.progress = Math.round(
                  ((this.uploadedSize + progressEvent.loaded) / this.file.size) * 100
                );
              }
            },
          });

          if (response.status === 200) {
            this.uploadedSize += chunk.size;
            currentChunk++;
            if (currentChunk < totalChunks) {
              uploadChunk(); // Загружаем следующий кусок
            } else {
              this.isUploading = false;
              alert('Upload complete');
            }
          }
        } catch (error) {
          this.uploadError = 'Failed to upload chunk';
          this.isUploading = false;
          console.error('Error uploading chunk', error);
        }
      };

      uploadChunk();
    },
  },
};
</script>

<style scoped>
progress {
  width: 100%;
}
</style>
