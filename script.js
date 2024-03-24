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
                    const gray = data[index];
                    pixels[y][x] = gray;
                }
            }
            console.log(pixels);
        };
    });

    const negativo = document.getElementById('negativo');
    negativo.addEventListener('click', function () {
        if (!pixels || pixels.length === 0) {
            console.error('Pixels não foram inicializados.');
            return;
        }

        const new_pixels = [];
        for (let y = 0; y < pixels.length; y++) {
            new_pixels[y] = [];
            for (let x = 0; x < pixels[y].length; x++) {
                new_pixels[y][x] = 255 - pixels[y][x];
            }
        }

        const new_canvas = document.createElement('canvas');
        const new_ctx = new_canvas.getContext('2d');
        new_canvas.width = pixels[0].length;
        new_canvas.height = pixels.length;

        for (let y = 0; y < new_pixels.length; y++) {
            for (let x = 0; x < new_pixels[y].length; x++) {
                const value = new_pixels[y][x];
                new_ctx.fillStyle = `rgb(${value},${value},${value})`;
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
});
