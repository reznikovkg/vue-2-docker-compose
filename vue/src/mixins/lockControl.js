export default{
    data() {
        return {
          lockedKeys: []
        }
      },
      methods: {

        lockKeys(keys) {
          this.lockedKeys = [...keys];
          document.addEventListener('keydown', this.handleKeyLock);
        },
    
        unlockKeys(keys = []) {
            this.lockedKeys = keys.length 
              ? this.lockedKeys.filter(k => !keys.includes(k))
              : []
          },
    
        handleKeyLock(e) {
          if (this.lockedKeys.includes(e.code)) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }
      },
      beforeDestroy() {
        this.unlockKeys();
      }
}