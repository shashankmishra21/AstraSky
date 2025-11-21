import { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  isDarkMode: boolean;
}

export function StarfieldBackground({ isDarkMode }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    interface Asteroid {
      x: number;
      y: number;
      radius: number;
      speed: number;
      rotation: number;
      rotationSpeed: number;
    }

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const asteroids: Asteroid[] = [];
    const starCount = 300;

    // Star colors (white, blue-white, silver)
    const starColors = [
      'rgba(255, 255, 255,',
      'rgba(200, 220, 255,',
      'rgba(192, 192, 192,',
      'rgba(173, 216, 230,',
    ];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.03 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Initialize shooting stars
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        angle: Math.PI / 4,
        opacity: 0,
        active: false,
      });
    }

    // Initialize asteroids
    for (let i = 0; i < 5; i++) {
      asteroids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.2 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Moon properties
    const moon = {
      x: canvas.width * 0.85,
      y: canvas.height * 0.15,
      radius: 40,
    };

    let animationFrameId: number;
    let frameCount = 0;

    const drawMoon = () => {
      // Moon glow
      const gradient = ctx.createRadialGradient(
        moon.x, moon.y, 0,
        moon.x, moon.y, moon.radius * 2.5
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(0.3, 'rgba(200, 220, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moon.x, moon.y, moon.radius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      const moonGradient = ctx.createRadialGradient(
        moon.x - moon.radius * 0.3, moon.y - moon.radius * 0.3, 0,
        moon.x, moon.y, moon.radius
      );
      moonGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      moonGradient.addColorStop(0.7, 'rgba(220, 220, 230, 0.8)');
      moonGradient.addColorStop(1, 'rgba(180, 180, 200, 0.7)');
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
      ctx.fill();

      // Moon craters
      ctx.fillStyle = 'rgba(150, 150, 170, 0.3)';
      ctx.beginPath();
      ctx.arc(moon.x + 10, moon.y - 5, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moon.x - 8, moon.y + 10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moon.x + 15, moon.y + 15, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStars = () => {
      stars.forEach((star) => {
        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
        
        // Star glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3
        );
        gradient.addColorStop(0, `${star.color} ${star.opacity * twinkle})`);
        gradient.addColorStop(0.5, `${star.color} ${star.opacity * twinkle * 0.3})`);
        gradient.addColorStop(1, `${star.color} 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = `${star.color} ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Slow drift
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star) => {
        // Randomly activate shooting stars
        if (!star.active && Math.random() < 0.001) {
          star.active = true;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height * 0.5;
          star.opacity = 1;
        }

        if (star.active) {
          // Draw shooting star trail
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          ctx.stroke();

          // Move shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= 0.01;

          // Deactivate when off screen or faded
          if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      });
    };

    const drawAsteroids = () => {
      asteroids.forEach((asteroid) => {
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.rotation);

        // Asteroid with irregular shape
        ctx.fillStyle = 'rgba(100, 100, 120, 0.6)';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = asteroid.radius * (0.7 + Math.random() * 0.3);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();

        // Asteroid highlight
        ctx.fillStyle = 'rgba(150, 150, 170, 0.3)';
        ctx.beginPath();
        ctx.arc(-asteroid.radius * 0.3, -asteroid.radius * 0.3, asteroid.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Move and rotate asteroid
        asteroid.x += asteroid.speed;
        asteroid.rotation += asteroid.rotationSpeed;

        if (asteroid.x > canvas.width + asteroid.radius) {
          asteroid.x = -asteroid.radius;
          asteroid.y = Math.random() * canvas.height;
        }
      });
    };

    const animate = () => {
      // Create deep space gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#000814');
      bgGradient.addColorStop(0.5, '#001d3d');
      bgGradient.addColorStop(1, '#000814');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawMoon();
      drawStars();
      drawShootingStars();
      drawAsteroids();

      frameCount++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      moon.x = canvas.width * 0.85;
      moon.y = canvas.height * 0.15;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isDarkMode ? 1 : 0.4 }}
    />
  );
}
