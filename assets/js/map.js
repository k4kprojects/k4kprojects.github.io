        // Garantindo que o DOM está totalmente carregado
        window.addEventListener('load', () => {
            const _map = document.querySelector('.map');
            const lines = document.querySelectorAll('.line');
            const container = document.querySelector('.container');

            if (_map && lines && container) {
                // Efeito de clique para as linhas neon
                _map.addEventListener('click', () => {
                    lines.forEach(line => {
                        line.classList.toggle('neon');
                    });
                });

                // Efeito de paralaxe
                container.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = container.getBoundingClientRect();
                    const mouseX = e.clientX - left;
                    const mouseY = e.clientY - top;
                    
                    // Calcula a posição relativa do mouse (de -0.5 a 0.5)
                    const xPos = (mouseX / width - 0.5);
                    const yPos = (mouseY / height - 0.5);
                    
                    // Aplica a rotação (max 10 graus)
                    const rotateX = yPos * 10;
                    const rotateY = -xPos * 10;
                    
                    _map.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                // Reset da posição quando o mouse sai do container
                container.addEventListener('mouseleave', () => {
                    _map.style.transform = 'rotateX(0) rotateY(0)';
                });
            }
        });