// Professional Website Checklist Application
class ChecklistApp {
  constructor() {
    this.form = document.getElementById('checklistForm');
    this.progressBar = document.getElementById('progressFill');
    this.progressText = document.getElementById('progressText');
    this.generatePdfBtn = document.getElementById('generatePdfBtn');
    
    this.accordionHeaders = document.querySelectorAll('.accordion-header');
    this.accordionContents = document.querySelectorAll('.accordion-content');
    
    this.totalFields = 0;
    this.completedFields = 0;
    
    this.sectionData = {
      'info-basicas': { total: 6, completed: 0 },
      'identidade-visual': { total: 13, completed: 0 },
      'estrutura-layout': { total: 13, completed: 0 },
      'responsividade': { total: 7, completed: 0 },
      'acessibilidade': { total: 10, completed: 0 },
      'performance': { total: 11, completed: 0 },
      'seo': { total: 11, completed: 0 },
      'seguranca': { total: 7, completed: 0 },
      'testes': { total: 10, completed: 0 },
      'pos-lancamento': { total: 7, completed: 0 }
    };
    
    this.init();
  }
  
  init() {
    this.setupAccordion();
    this.setupFormValidation();
    this.setupProgressTracking();
    this.setupPdfGeneration();
    this.setupKeyboardNavigation();
    this.loadSavedData();
    this.calculateTotalFields();
    this.updateProgress();
  }
  
  setupAccordion() {
    this.accordionHeaders.forEach((header, index) => {
      header.addEventListener('click', (e) => {
        this.toggleAccordion(header);
      });
      
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleAccordion(header);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.focusNextHeader(index);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.focusPrevHeader(index);
        }
      });
    });
  }
  
  toggleAccordion(header) {
    const content = document.getElementById(header.getAttribute('aria-controls'));
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // Close all other accordions
    this.accordionHeaders.forEach(h => {
      if (h !== header) {
        h.setAttribute('aria-expanded', 'false');
        const otherContent = document.getElementById(h.getAttribute('aria-controls'));
        otherContent.classList.remove('expanded');
      }
    });
    
    // Toggle current accordion
    header.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('expanded', !isExpanded);
    
    // Scroll to section if opening
    if (!isExpanded) {
      setTimeout(() => {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }
  
  focusNextHeader(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.accordionHeaders.length;
    this.accordionHeaders[nextIndex].focus();
  }
  
  focusPrevHeader(currentIndex) {
    const prevIndex = currentIndex === 0 ? this.accordionHeaders.length - 1 : currentIndex - 1;
    this.accordionHeaders[prevIndex].focus();
  }
  
  setupFormValidation() {
    const requiredFields = this.form.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.validateField(field));
      field.addEventListener('change', () => this.validateField(field));
    });
  }
  
  validateField(field) {
    const isEmpty = !field.value.trim();
    field.classList.toggle('error', isEmpty);
    
    // Update progress after validation
    setTimeout(() => this.updateProgress(), 50);
  }
  
  setupProgressTracking() {
    const allInputs = this.form.querySelectorAll('input, select, textarea');
    
    allInputs.forEach(input => {
      input.addEventListener('input', () => this.updateProgress());
      input.addEventListener('change', () => this.updateProgress());
    });
  }
  
  calculateTotalFields() {
    const allInputs = this.form.querySelectorAll('input[data-section], select[data-section], textarea[data-section]');
    this.totalFields = allInputs.length;
  }
  
  updateProgress() {
    let totalCompleted = 0;
    
    // Update each section
    Object.keys(this.sectionData).forEach(sectionId => {
      const sectionFields = this.form.querySelectorAll(`[data-section="${sectionId}"]`);
      let sectionCompleted = 0;
      
      sectionFields.forEach(field => {
        if (field.type === 'checkbox') {
          if (field.checked) sectionCompleted++;
        } else {
          if (field.value.trim()) sectionCompleted++;
        }
      });
      
      this.sectionData[sectionId].completed = sectionCompleted;
      totalCompleted += sectionCompleted;
      
      // Update section counter
      const counter = document.getElementById(`counter-${sectionId}`);
      if (counter) {
        counter.textContent = `${sectionCompleted}/${this.sectionData[sectionId].total}`;
      }
    });
    
    // Update main progress
    this.completedFields = totalCompleted;
    const percentage = Math.round((this.completedFields / this.totalFields) * 100);
    
    this.progressBar.style.width = `${percentage}%`;
    this.progressText.textContent = `${percentage}% Completo`;
    
    // Save data
    this.saveData();
  }
  
  setupPdfGeneration() {
    this.generatePdfBtn.addEventListener('click', () => {
      this.generatePDF();
    });
  }
  
  setupKeyboardNavigation() {
    // Focus management for form elements
    const focusableElements = this.form.querySelectorAll(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          // Let default tab behavior work
          return;
        }
      });
    });
  }
  
  saveData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    // Save checkboxes that aren't checked
    const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
        data[checkbox.name] = 'false';
      }
    });
    
    try {
      sessionStorage.setItem('checklistData', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save data to sessionStorage:', e);
    }
  }
  
  loadSavedData() {
    try {
      const savedData = sessionStorage.getItem('checklistData');
      if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.entries(data).forEach(([key, value]) => {
          const element = this.form.querySelector(`[name="${key}"]`);
          if (element) {
            if (element.type === 'checkbox') {
              element.checked = value === 'on' || value === true;
            } else {
              element.value = value;
            }
          }
        });
      }
    } catch (e) {
      console.warn('Could not load saved data:', e);
    }
  }
  
  generatePDF() {
    if (!window.jsPDF) {
      alert('Biblioteca jsPDF não foi carregada. Tente novamente.');
      return;
    }
    
    this.generatePdfBtn.classList.add('loading');
    this.generatePdfBtn.disabled = true;
    this.generatePdfBtn.textContent = 'Gerando PDF...';
    
    setTimeout(() => {
      try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Get form data
        const formData = this.collectFormData();
        
        // PDF Configuration
        const margin = 20;
        const pageWidth = doc.internal.pageSize.width;
        const maxWidth = pageWidth - (margin * 2);
        let yPosition = margin;
        
        // Helper function to add new page if needed
        const checkPageBreak = (neededHeight = 10) => {
          if (yPosition + neededHeight > doc.internal.pageSize.height - margin) {
            doc.addPage();
            yPosition = margin;
          }
        };
        
        // Helper function to add text with word wrap
        const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
          doc.setFontSize(fontSize);
          const lines = doc.splitTextToSize(text, maxWidth);
          doc.text(lines, x, y);
          return lines.length * (fontSize * 0.35);
        };
        
        // Header
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Checklist Completo para Criação de Site Profissional', margin, yPosition);
        yPosition += 10;
        
        // Company info and date
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const today = new Date().toLocaleDateString('pt-BR');
        doc.text(`Data: ${today}`, margin, yPosition);
        yPosition += 8;
        
        if (formData['nome-empresa']) {
          doc.text(`Empresa: ${formData['nome-empresa']}`, margin, yPosition);
          yPosition += 8;
        }
        
        yPosition += 5;
        
        // Progress Summary
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Resumo do Progresso', margin, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        const totalPercentage = Math.round((this.completedFields / this.totalFields) * 100);
        doc.text(`Progresso Geral: ${totalPercentage}% (${this.completedFields}/${this.totalFields} itens)`, margin, yPosition);
        yPosition += 10;
        
        // Section summaries
        const sectionNames = {
          'info-basicas': 'Informações Básicas',
          'identidade-visual': 'Identidade Visual',
          'estrutura-layout': 'Estrutura e Layout',
          'responsividade': 'Responsividade',
          'acessibilidade': 'Acessibilidade',
          'performance': 'Performance',
          'seo': 'SEO',
          'seguranca': 'Segurança',
          'testes': 'Testes',
          'pos-lancamento': 'Pós-Lançamento'
        };
        
        Object.entries(this.sectionData).forEach(([sectionId, data]) => {
          const percentage = Math.round((data.completed / data.total) * 100);
          const sectionName = sectionNames[sectionId] || sectionId;
          doc.text(`${sectionName}: ${percentage}% (${data.completed}/${data.total})`, margin + 10, yPosition);
          yPosition += 6;
        });
        
        yPosition += 10;
        checkPageBreak(20);
        
        // Detailed sections
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Detalhamento por Seção', margin, yPosition);
        yPosition += 12;
        
        // Process each section
        this.accordionHeaders.forEach((header) => {
          const sectionId = header.getAttribute('aria-controls');
          const sectionTitle = header.querySelector('.section-title').textContent;
          const sectionNumber = header.querySelector('.section-number').textContent;
          
          checkPageBreak(20);
          
          // Section header
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.text(`${sectionNumber}. ${sectionTitle}`, margin, yPosition);
          yPosition += 10;
          
          // Section fields
          const sectionElement = document.getElementById(sectionId);
          const fields = sectionElement.querySelectorAll('input, select, textarea');
          
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          
          fields.forEach(field => {
            checkPageBreak(8);
            
            const label = this.getFieldLabel(field);
            let value = '';
            let status = '';
            
            if (field.type === 'checkbox') {
              status = field.checked ? ' ✓' : ' ✗';
              value = field.checked ? 'Sim' : 'Não';
            } else {
              value = field.value || 'Não preenchido';
              status = field.value ? ' ✓' : ' ✗';
            }
            
            const text = `${status} ${label}: ${value}`;
            const textHeight = addWrappedText(text, margin + 5, yPosition, maxWidth - 5, 9);
            yPosition += textHeight + 2;
          });
          
          yPosition += 8;
        });
        
        // Footer on last page
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setFont(undefined, 'normal');
          doc.text(
            `Página ${i} de ${pageCount} - Checklist Profissional`,
            margin,
            doc.internal.pageSize.height - 10
          );
        }
        
        // Save PDF
        const fileName = `checklist-site-profissional-${today.replace(/\//g, '-')}.pdf`;
        doc.save(fileName);
        
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Tente novamente.');
      } finally {
        this.generatePdfBtn.classList.remove('loading');
        this.generatePdfBtn.disabled = false;
        this.generatePdfBtn.textContent = '📄 Gerar PDF';
      }
    }, 500);
  }
  
  collectFormData() {
    const formData = {};
    const inputs = this.form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        formData[input.name] = input.checked;
      } else {
        formData[input.name] = input.value;
      }
    });
    
    return formData;
  }
  
  getFieldLabel(field) {
    // Try to find label by 'for' attribute
    let label = document.querySelector(`label[for="${field.id}"]`);
    
    if (!label) {
      // Try to find parent label
      label = field.closest('label');
    }
    
    if (!label) {
      // Try to find previous sibling label
      let prev = field.previousElementSibling;
      while (prev && prev.tagName !== 'LABEL') {
        prev = prev.previousElementSibling;
      }
      label = prev;
    }
    
    if (label) {
      return label.textContent.replace(/\s*\*\s*$/, '').trim();
    }
    
    // Fallback to field name or id
    return field.name || field.id || 'Campo sem nome';
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChecklistApp();
});

// Add keyboard accessibility helpers
document.addEventListener('keydown', (e) => {
  // Skip to main content with Alt+M
  if (e.altKey && e.key === 'm') {
    e.preventDefault();
    document.querySelector('.main').focus();
  }
  
  // Focus search/filter functionality could be added here
  // For now, focusing on core functionality
});

// Add visual feedback for form interactions
document.addEventListener('change', (e) => {
  if (e.target.matches('input, select, textarea')) {
    // Add subtle animation to show field was updated
    e.target.style.transform = 'scale(1.02)';
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  }
});

// Handle form submission prevention
document.addEventListener('submit', (e) => {
  if (e.target.id === 'checklistForm') {
    e.preventDefault();
    return false;
  }
});

// Add announcement for screen readers when progress updates
let progressAnnounceTimeout;
function announceProgress(percentage) {
  clearTimeout(progressAnnounceTimeout);
  progressAnnounceTimeout = setTimeout(() => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Progresso atualizado: ${percentage}% completo`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, 500);
}

// Export functionality for potential future use
window.ChecklistApp = ChecklistApp;