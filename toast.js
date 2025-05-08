class ToastNotification {
    constructor() {
      this.container = document.querySelector('.toast-container');
      this.setupContainer();
      this.bindEvents();
      
      this.duration = 5000;
      this.toastCount = 0;
      this.maxToasts = 3;
    }
    
    setupContainer() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'fixed top-5 right-4 z-50 w-96 space-y-4 toast-container';
        document.body.appendChild(this.container);
      }
      this.container.innerHTML = '';
    }
    
    bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.toast-close-btn')) {
          const toast = e.target.closest('.toast');
          if (toast) this.hideToast(toast);
        }
      });
    }
    
    createToast(type, title, message) {
      const id = `toast-${Date.now()}-${this.toastCount++}`;
      const toast = document.createElement('div');
      
      let colorClass, iconPath;
      
      switch (type) {
        case 'success':
          colorClass = 'bg-green-500';
          iconPath = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />';
          break;
        case 'error':
          colorClass = 'bg-red-500';
          iconPath = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />';
          break;
        case 'warning':
          colorClass = 'bg-yellow-500';
          iconPath = '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />';
          break;
        default:
          colorClass = 'bg-blue-500';
          iconPath = '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />';
      }
      
      toast.id = id;
      toast.className = `flex overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 toast opacity-0 transform translate-x-full`;
      toast.innerHTML = `
        <div class="w-2 ${colorClass}"></div>
        <div class="px-4 py-3 w-full relative">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-${colorClass.replace('bg-', '')}" viewBox="0 0 20 20" fill="currentColor">
                ${iconPath}
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">${title}</p>
              <p class="mt-1 text-sm text-gray-600">${message}</p>
            </div>
            <button class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors toast-close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>`;
      
      return toast;
    }
    
    showToast(type, title, message, duration = this.duration) {
      const existingToasts = this.container.querySelectorAll('.toast');
      if (existingToasts.length >= this.maxToasts) {
        this.hideToast(existingToasts[0]);
      }
      
      const toast = this.createToast(type, title, message);
      this.container.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-x-full');
      }, 10);
      
      if (duration > 0) {
        setTimeout(() => {
          this.hideToast(toast);
        }, duration);
      }
      
      return toast;
    }
    
    hideToast(toast) {
      if (!toast) return;
      
      toast.classList.add('opacity-0', 'translate-x-full');
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
    
    success(title, message, duration) {
      return this.showToast('success', title, message, duration);
    }
    
    error(title, message, duration) {
      return this.showToast('error', title, message, duration);
    }
    
    warning(title, message, duration) {
      return this.showToast('warning', title, message, duration);
    }
    
    info(title, message, duration) {
      return this.showToast('info', title, message, duration);
    }
  }
  
  // Initialize the toast notification system
  const toast = new ToastNotification();
  
  // Expose to global scope
  window.toast = toast;