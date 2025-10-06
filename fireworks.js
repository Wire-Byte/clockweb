// 简单烟花动画，依赖canvas
function showFireworks() {
    let canvas = document.getElementById('fireworks-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'fireworks-canvas';
        canvas.style.position = 'fixed';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2000';
        document.body.appendChild(canvas);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let particles = [];
    // 更加鲜艳的烟花颜色
    let colors = ['#ff1744','#ffd600','#00e676','#2979ff','#d500f9','#ff9100','#00b8d4','#ff3d00','#f50057','#76ff03','#00bfae','#ffea00','#ff80ab','#ea80fc','#18ffff'];
    function createFirework() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.6;
        let color = colors[Math.floor(Math.random()*colors.length)];
        for(let i=0;i<60;i++){
            let angle = (Math.PI*2)*i/60;
            let speed = Math.random()*4+2;
            particles.push({
                x:x,
                y:y,
                vx:Math.cos(angle)*speed,
                vy:Math.sin(angle)*speed,
                alpha:1,
                color:color
            });
        }
    }
    let fireworkCount = 0;
    let maxFireworkCount = 12; // 增加烟花数量
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,2*Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.alpha -= 0.007; // 降低消失速度，持续更久
        });
        particles = particles.filter(p=>p.alpha>0);
        if (fireworkCount < maxFireworkCount && Math.random()<0.08) {
            createFirework();
            fireworkCount++;
        }
        if (particles.length>0 || fireworkCount<maxFireworkCount) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(()=>{
                if(canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }, 1200);
        }
    }
    animate();
}
