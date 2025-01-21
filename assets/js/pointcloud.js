// Sistema de carregamento para nuvem de pontos
function initializePointCloudViewer() {
    const viewer = document.querySelector('.point-cloud-viewer');
    
    viewer.addEventListener('click', function(e) {
        // Previne que o clique propague para o iframe
        e.preventDefault();
        
        if (!viewer.classList.contains('loaded')) {
            const loadingState = document.createElement('div');
            loadingState.className = 'loading-state';
            loadingState.innerHTML = `
                <div class="loading-spinner"></div>
                <div>Carregando Visualização...</div>
            `;
            
            viewer.appendChild(loadingState);
            
            // Adiciona classe loaded após breve delay para mostrar loading
            setTimeout(() => {
                viewer.classList.add('loaded');
                loadingState.remove();
            }, 800);
        }
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializePointCloudViewer);