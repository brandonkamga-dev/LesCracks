/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			display: [
  				'Space Grotesk',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Monaco',
  				'Cascadia Code',
  				'Segoe UI Mono',
  				'Roboto Mono',
  				'Oxygen Mono',
  				'Ubuntu Monospace',
  				'Source Code Pro',
  				'Fira Mono',
  				'Droid Sans Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		colors: {
  			primary: {
  				blue: '#1f48ff',
  				yellow: '#ffcc00',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			blue: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#1f48ff',
  				'600': '#1a3de6',
  				'700': '#1532cc',
  				'800': '#1027b3',
  				'900': '#0b1c99'
  			},
  			yellow: {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#ffcc00',
  				'500': '#f59e0b',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'bounce-slow': 'bounce 2s infinite',
  			'slide-left': 'slideLeft 0.8s ease-out',
  			'slide-right': 'slideRight 0.8s ease-out',
  			'bounce-soft': 'bounceSoft 2s infinite',
  			'pulse-soft': 'pulseSoft 3s infinite',
  			float: 'float 6s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite alternate',
  			shimmer: 'shimmer 2s linear infinite',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'gradient-y': 'gradient-y 15s ease infinite',
  			'gradient-xy': 'gradient-xy 15s ease infinite',
  			'scale-in': 'scaleIn 0.5s ease-out',
  			'rotate-in': 'rotateIn 0.6s ease-out',
  			flip: 'flip 0.6s ease-in-out',
  			swing: 'swing 1s ease-in-out',
  			wobble: 'wobble 1s ease-in-out',
  			heartbeat: 'heartbeat 1.5s ease-in-out infinite',
  			typewriter: 'typewriter 4s steps(40) 1s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			bounceSoft: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			pulseSoft: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
  		},
  		backgroundSize: {
  			'200%': '200% 100%'
  		},
  		letterSpacing: {
  			tighter: '-0.05em',
  			wider: '0.05em'
  		},
  		lineHeight: {
  			'extra-tight': '1.1',
  			'extra-loose': '2'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  			'6xl': '3rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  			medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)',
  			large: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -10px rgba(0, 0, 0, 0.1)',
  			violet: '0 10px 40px -10px rgba(124, 58, 237, 0.3)',
  			indigo: '0 10px 40px -10px rgba(99, 102, 241, 0.3)'
  		},
  		screens: {
  			xs: '475px',
  			'3xl': '1600px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};