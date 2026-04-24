# Build script: Assemble Stitch screens into one-page website
$screens = "c:\Users\Saurabh\sparrow_films\stitch_screens"

# Read all files
$hero = Get-Content "$screens\hero.html" -Raw
$services = Get-Content "$screens\services.html" -Raw  
$portfolio = Get-Content "$screens\portfolio.html" -Raw
$industries = Get-Content "$screens\industries.html" -Raw
$testimonials = Get-Content "$screens\testimonials.html" -Raw

# Extract sections using regex
function Get-Section($html, $startPattern, $endPattern) {
    if ($html -match "(?s)($startPattern.*?$endPattern)") {
        return $matches[1]
    }
    return ""
}

# Hero section (lines 120-168 of hero.html) - the main hero
$heroSection = ""
$heroLines = Get-Content "$screens\hero.html"
$capture = $false
$heroArr = @()
foreach ($line in $heroLines) {
    if ($line -match '<!-- Cinematic Hero Section -->') { $capture = $true }
    if ($capture) { $heroArr += $line }
    if ($capture -and $line -match '</main>') { $capture = $false; break }
}
$heroSection = $heroArr -join "`n"
# Remove the closing </main> tag
$heroSection = $heroSection -replace '</main>', ''

# Trust strip + Services (lines 99-209 of services.html)
$svcLines = Get-Content "$screens\services.html"
$capture = $false
$svcArr = @()
foreach ($line in $svcLines) {
    if ($line -match '<!-- TRUST STRIP SECTION -->') { $capture = $true }
    if ($capture) { $svcArr += $line }
    if ($capture -and $line -match '</main>') { $capture = $false; break }
}
$svcSection = $svcArr -join "`n"
$svcSection = $svcSection -replace '</main>', ''

# Portfolio (lines 108-234 of portfolio.html)
$portLines = Get-Content "$screens\portfolio.html"
$capture = $false
$portArr = @()
foreach ($line in $portLines) {
    if ($line -match '<!-- Portfolio Section -->') { $capture = $true }
    if ($capture) { $portArr += $line }
    if ($capture -and $line -match '</main>') { $capture = $false; break }
}
$portSection = $portArr -join "`n"
$portSection = $portSection -replace '</main>', ''

# Industries + Process + About (lines 108-210 of industries.html)
$indLines = Get-Content "$screens\industries.html"
$capture = $false
$indArr = @()
foreach ($line in $indLines) {
    if ($line -match '<!-- SECTION 1: INDUSTRIES') { $capture = $true }
    if ($capture) { $indArr += $line }
    if ($capture -and $line -match '</main>') { $capture = $false; break }
}
$indSection = $indArr -join "`n"
$indSection = $indSection -replace '</main>', ''

# Testimonials + Contact + Footer (lines 107-267 of testimonials.html)
$testLines = Get-Content "$screens\testimonials.html"
$capture = $false
$testArr = @()
foreach ($line in $testLines) {
    if ($line -match '<!-- SECTION 1: TESTIMONIALS -->') { $capture = $true }
    if ($capture) { $testArr += $line }
    if ($capture -and $line -match '</main>') { $capture = $false; break }
}
$testSection = $testArr -join "`n"
$testSection = $testSection -replace '</main>', ''

# Footer from testimonials
$footCapture = $false
$footArr = @()
foreach ($line in $testLines) {
    if ($line -match '<!-- SECTION 3: FOOTER -->') { $footCapture = $true }
    if ($footCapture) { $footArr += $line }
    if ($footCapture -and $line -match '</footer>') { $footCapture = $false; break }
}
$footerSection = $footArr -join "`n"

# Build the head section with shared config
$head = @'
<!DOCTYPE html>
<html class="light" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Spparow Films | Industrial Video Production</title>
<meta name="description" content="Spparow Films creates cinematic industrial, factory, corporate and brand videos that make businesses look sharp, credible and professional."/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#00347b",
                "primary-container": "#1f4b99",
                "on-primary": "#ffffff",
                "on-primary-container": "#a5bfff",
                "secondary": "#5f5e5e",
                "secondary-container": "#e5e2e1",
                "on-secondary": "#ffffff",
                "on-secondary-container": "#656464",
                "tertiary": "#363836",
                "tertiary-container": "#4d4f4c",
                "on-tertiary": "#ffffff",
                "on-tertiary-container": "#c0c0bd",
                "error": "#ba1a1a",
                "error-container": "#ffdad6",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",
                "background": "#fcf9f8",
                "on-background": "#1c1b1b",
                "surface": "#fcf9f8",
                "on-surface": "#1c1b1b",
                "surface-variant": "#e5e2e1",
                "on-surface-variant": "#434651",
                "outline": "#747782",
                "outline-variant": "#c3c6d3",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f6f3f2",
                "surface-container": "#f0edec",
                "surface-container-high": "#ebe7e7",
                "surface-container-highest": "#e5e2e1",
                "surface-bright": "#fcf9f8",
                "surface-dim": "#dcd9d9",
                "surface-tint": "#335caa",
                "inverse-surface": "#313030",
                "inverse-on-surface": "#f3f0ef",
                "inverse-primary": "#afc6ff",
                "primary-fixed": "#d9e2ff",
                "primary-fixed-dim": "#afc6ff",
                "on-primary-fixed": "#001944",
                "on-primary-fixed-variant": "#134391",
                "secondary-fixed": "#e5e2e1",
                "secondary-fixed-dim": "#c8c6c5",
                "on-secondary-fixed": "#1c1b1b",
                "on-secondary-fixed-variant": "#474646",
                "tertiary-fixed": "#e3e3df",
                "tertiary-fixed-dim": "#c6c7c3",
                "on-tertiary-fixed": "#1a1c1a",
                "on-tertiary-fixed-variant": "#464744"
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                full: "0.75rem"
            },
            fontFamily: {
                headline: ["Manrope", "sans-serif"],
                display: ["Manrope", "sans-serif"],
                body: ["Manrope", "sans-serif"],
                label: ["Manrope", "sans-serif"]
            }
        }
    }
}
</script>
<style>
body { font-family: 'Manrope', sans-serif; scroll-behavior: smooth; }
html { scroll-behavior: smooth; }
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block; line-height: 1; text-transform: none;
    letter-spacing: normal; word-wrap: normal; white-space: nowrap; direction: ltr;
}
.hero-gradient { background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 100%); }
.frosted-card { background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
.service-card:hover .service-arrow { transform: translateX(8px); }
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
</style>
</head>
<body class="bg-surface text-on-surface antialiased">
'@

# Header nav from header.html (lines 93-114)
$headerNav = @'
<!-- HEADER -->
<header id="site-header" class="fixed top-0 w-full h-[80px] z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between px-6 md:px-10 max-w-full mx-auto font-['Manrope'] antialiased tracking-wide transition-all duration-300">
<div class="text-2xl font-extrabold tracking-tighter text-on-surface uppercase cursor-pointer active:scale-[0.98] transition-transform">
    Spparow Films
</div>
<nav class="hidden md:flex items-center gap-[32px]">
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#hero">Home</a>
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#work">Work</a>
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#services">Services</a>
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#process">Process</a>
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#about">About</a>
    <a class="text-[15px] text-on-surface-variant font-medium hover:text-on-surface transition-all cursor-pointer" href="#contact">Contact</a>
</nav>
<div class="flex items-center gap-4">
    <button class="bg-[#1F4B99] text-white px-6 py-3 rounded-xl font-semibold text-[14px] hover:opacity-90 transition-all active:scale-[0.98]">Start a Project</button>
    <button class="md:hidden text-on-surface" id="mobile-menu-btn">
        <span class="material-symbols-outlined text-2xl">menu</span>
    </button>
</div>
</header>
<!-- Mobile Menu -->
<div id="mobile-menu" class="fixed inset-0 z-[60] bg-surface hidden flex-col items-center justify-center gap-8">
<button class="absolute top-6 right-6 text-on-surface" id="mobile-menu-close">
    <span class="material-symbols-outlined text-3xl">close</span>
</button>
<a class="text-xl font-semibold text-on-surface" href="#hero" onclick="closeMobileMenu()">Home</a>
<a class="text-xl font-semibold text-on-surface" href="#work" onclick="closeMobileMenu()">Work</a>
<a class="text-xl font-semibold text-on-surface" href="#services" onclick="closeMobileMenu()">Services</a>
<a class="text-xl font-semibold text-on-surface" href="#process" onclick="closeMobileMenu()">Process</a>
<a class="text-xl font-semibold text-on-surface" href="#about" onclick="closeMobileMenu()">About</a>
<a class="text-xl font-semibold text-on-surface" href="#contact" onclick="closeMobileMenu()">Contact</a>
</div>
<main class="pt-[80px]">
'@

$closing = @'
</main>
'@

$js = @'
<script>
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
// Mobile menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('mobile-menu-close');
function closeMobileMenu() { menu.classList.add('hidden'); menu.classList.remove('flex'); }
if (btn) btn.addEventListener('click', () => { menu.classList.remove('hidden'); menu.classList.add('flex'); });
if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Portfolio filter
document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => {
            b.classList.remove('bg-[#1F4B99]', 'text-white');
            b.classList.add('bg-[#F3F3EF]', 'text-[#5F5F5F]');
        });
        btn.classList.remove('bg-[#F3F3EF]', 'text-[#5F5F5F]');
        btn.classList.add('bg-[#1F4B99]', 'text-white');
        const cat = btn.dataset.filter;
        document.querySelectorAll('[data-category]').forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
</script>
</body></html>
'@

# Assemble
$output = $head + "`n" + $headerNav + "`n" + $heroSection + "`n" + $svcSection + "`n" + $portSection + "`n" + $indSection + "`n" + $testSection + "`n" + $closing + "`n" + $footerSection + "`n" + $js

$output | Out-File -FilePath "c:\Users\Saurabh\sparrow_films\index.html" -Encoding utf8

Write-Output "Build complete! index.html created."
Write-Output ("Size: " + (Get-Item "c:\Users\Saurabh\sparrow_films\index.html").Length + " bytes")
