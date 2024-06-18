// InteractionManager.js

class InteractionManager {
    constructor(interactor) {
      this.interactor = interactor;
    }
  
    async init() {
      try {
       
        await this.interactor.init();
        console.log('Interaction manager initialized successfully.');
      } catch (error) {
        console.error('Error initializing interaction manager:', error);
      }
    }
  }
  
  export default InteractionManager;
  