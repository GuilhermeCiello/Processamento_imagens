document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('imagem');
    let pixels;

    input.addEventListener('change', function () {
        const file = input.files[0];
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imageUrl;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            pixels = [];
            for (let y = 0; y < canvas.height; y++) {
                pixels[y] = [];
                for (let x = 0; x < canvas.width; x++) {
                    const index = (y * canvas.width + x) * 4;
                    const r = 255 - data[index];
                    const g = 255 - data[index + 1];
                    const b = 255 - data[index + 2];
                    pixels[y][x] = [r, g, b];
                }
            }
            console.log(pixels);
              // Exibir imagem original
              const imagemOriginal = document.getElementById('imagemOriginal');
              imagemOriginal.src = imageUrl;
        };
    });

    const negativo = document.getElementById('negativo');
    negativo.addEventListener('click', function () {
        if (!pixels || pixels.length === 0) {
            console.error('Pixels não foram inicializados.');
            return;
        }

        const new_canvas = document.createElement('canvas');
        const new_ctx = new_canvas.getContext('2d');
        new_canvas.width = pixels[0].length;
        new_canvas.height = pixels.length;

        for (let y = 0; y < pixels.length; y++) {
            for (let x = 0; x < pixels[y].length; x++) {
                const [r, g, b] = pixels[y][x];
                new_ctx.fillStyle = `rgb(${r},${g},${b})`;
                new_ctx.fillRect(x, y, 1, 1);
            }
        }

        const new_imageUrl = new_canvas.toDataURL(); // URL da nova imagem
        const new_img = new Image();
        new_img.src = new_imageUrl;

        // Exibe a nova imagem
        document.body.appendChild(new_img);

        // Ou faça o download da nova imagem
        // const link = document.createElement('a');
        // link.href = new_imageUrl;
        // link.download = 'imagem_negativa.png';
        // link.click();
    });

    const binario = document.getElementById('binario');
    binario.addEventListener('click', function () {
        if (!pixels || pixels.length === 0) {
            console.error('Pixels não foram inicializados.');
            return;
        }

        const new_canvas = document.createElement('canvas');
        const new_ctx = new_canvas.getContext('2d');
        new_canvas.width = pixels[0].length;
        new_canvas.height = pixels.length;

        for (let y = 0; y < pixels.length; y++) {
            for (let x = 0; x < pixels[y].length; x++) {
                const [r, g, b] = pixels[y][x];
                const gray = (r + g + b) / 3;
                const binary = gray > 127 ? 255 : 0;
                new_ctx.fillStyle = `rgb(${binary},${binary},${binary})`;
                new_ctx.fillRect(x, y, 1, 1);
            }
        }

        const new_imageUrl = new_canvas.toDataURL(); // URL da nova imagem
        const new_img = new Image();
        new_img.src = new_imageUrl;

        // Exibe a nova imagem
        document.body.appendChild(new_img);

        // Ou faça o download da nova imagem
        // const link = document.createElement('a');
        // link.href = new_imageUrl;
        // link.download = 'imagem_binaria.png';
        // link.click();
    });
});
