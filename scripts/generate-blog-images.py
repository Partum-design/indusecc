#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate original blog hero images for INDUSECC.

The assets are intentionally generated from vectors, gradients, and simple
procedural texture so they can be reused without stock-photo licensing issues.
"""

from __future__ import annotations

import math
import random
import textwrap
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "img_blogs"
W, H = 1600, 900

FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

BRAND_WINE = "#7B1E22"
BRAND_WINE_DARK = "#360A0D"
BRAND_GOLD = "#C9A84C"
BRAND_GOLD_LIGHT = "#E8C97A"
INK = "#171717"
PAPER = "#F8F4EA"


@dataclass(frozen=True)
class BlogAsset:
    folder: str
    slug: str
    category: str
    title: str
    subtitle: str
    tag: str
    accent: str
    secondary: str
    icon: str
    pattern: str
    seed: int


ASSETS: list[BlogAsset] = [
    BlogAsset("calidad-iso-9001", "iso-9001-transicion-2026", "Calidad ISO 9001", "ISO 9001:2026", "Cambios clave y ruta de transicion", "FDIS 2026", "#2E86AB", "#C9A84C", "checklist", "roadmap", 101),
    BlogAsset("calidad-iso-9001", "cultura-calidad-riesgos", "Calidad ISO 9001", "Cultura de calidad", "Riesgos, etica y mejora continua", "Gestion", "#8F2D56", "#F5C542", "target", "grid", 102),
    BlogAsset("calidad-iso-9001", "auditoria-procesos-calidad", "Calidad ISO 9001", "Auditoria de procesos", "Evidencia, trazabilidad y hallazgos", "ISO 19011", "#246A73", "#E8C97A", "documents", "audit", 103),
    BlogAsset("calidad-iso-9001", "mapa-procesos-mejora-continua", "Calidad ISO 9001", "Mapa de procesos", "Estandarizacion para mejorar resultados", "PDCA", "#4C6FFF", "#C9A84C", "flow", "process", 104),
    BlogAsset("calidad-iso-9001", "indicadores-kpi-tablero", "Calidad ISO 9001", "Indicadores KPI", "Tablero para toma de decisiones", "Metricas", "#00A7A7", "#E8C97A", "chart", "dashboard", 105),
    BlogAsset("ambiental-iso-14001", "iso-14001-transicion-2026", "Ambiental ISO 14001", "ISO 14001:2026", "Transicion ambiental para Mexico", "2026-2029", "#2FB344", "#C9A84C", "leaf", "eco", 201),
    BlogAsset("ambiental-iso-14001", "ciclo-vida-producto", "Ambiental ISO 14001", "Ciclo de vida", "Impactos desde diseno hasta disposicion", "LCA", "#3FA37C", "#E8C97A", "cycle", "orbits", 202),
    BlogAsset("ambiental-iso-14001", "gestion-residuos-industrial", "Ambiental ISO 14001", "Gestion de residuos", "Control operativo en planta", "Operacion", "#7CB342", "#C9A84C", "factory", "eco", 203),
    BlogAsset("ambiental-iso-14001", "cumplimiento-ambiental-mexico", "Ambiental ISO 14001", "Cumplimiento ambiental", "Requisitos legales y evidencia auditada", "Mexico", "#00897B", "#E8C97A", "scale", "documents", 204),
    BlogAsset("ambiental-iso-14001", "proveedores-control-ambiental", "Ambiental ISO 14001", "Control de proveedores", "Criterios ambientales y ciclo de vida", "Clausula 8.1", "#5A9E2F", "#C9A84C", "truck", "supply", 205),
    BlogAsset("ciberseguridad-iso-27001", "iso-27001-matriz-riesgos", "Ciberseguridad ISO 27001", "Matriz de riesgos", "Controles, activos y tratamiento", "SGSI", "#00B4D8", "#C9A84C", "shield", "circuit", 301),
    BlogAsset("ciberseguridad-iso-27001", "plan-ciberseguridad-mexico", "Ciberseguridad ISO 27001", "Plan de ciberseguridad", "Gobierno, proveedores y resiliencia", "Mexico 2025-2030", "#3A86FF", "#E8C97A", "network", "circuit", 302),
    BlogAsset("ciberseguridad-iso-27001", "continuidad-negocio-bcp", "Ciberseguridad ISO 27001", "Continuidad del negocio", "Preparacion ante incidentes criticos", "BCP", "#4361EE", "#C9A84C", "pulse", "orbits", 303),
    BlogAsset("ciberseguridad-iso-27001", "proteccion-datos-proveedores", "Ciberseguridad ISO 27001", "Proteccion de datos", "Riesgo en terceros y accesos", "Terceros", "#118AB2", "#E8C97A", "lock", "supply", 304),
    BlogAsset("ciberseguridad-iso-27001", "controles-anexo-a", "Ciberseguridad ISO 27001", "Controles Anexo A", "Mapa visual para implementacion", "ISO/IEC", "#4895EF", "#C9A84C", "control", "dashboard", 305),
    BlogAsset("seguridad-salud-iso-45001", "seguridad-industrial-nom-stps", "Seguridad ISO 45001", "Seguridad industrial", "NOM-STPS e ISO 45001 en operacion", "SST", "#F97316", "#C9A84C", "helmet", "factory", 401),
    BlogAsset("seguridad-salud-iso-45001", "analisis-riesgos-trabajo", "Seguridad ISO 45001", "Analisis de riesgos", "Prevencion en cada actividad critica", "IPER", "#E85D04", "#E8C97A", "warning", "grid", 402),
    BlogAsset("seguridad-salud-iso-45001", "investigacion-incidentes", "Seguridad ISO 45001", "Investigacion de incidentes", "Causa raiz y acciones correctivas", "RCA", "#F4A261", "#7B1E22", "magnify", "audit", 403),
    BlogAsset("seguridad-salud-iso-45001", "cultura-prevencion-liderazgo", "Seguridad ISO 45001", "Cultura de prevencion", "Liderazgo visible y participacion", "Liderazgo", "#D97706", "#E8C97A", "people", "orbits", 404),
    BlogAsset("seguridad-salud-iso-45001", "equipo-proteccion-operacion", "Seguridad ISO 45001", "EPP y operacion", "Controles para trabajo seguro", "Operacion", "#FB8500", "#C9A84C", "helmet", "process", 405),
    BlogAsset("auditorias-consultoria", "auditoria-interna-hallazgos", "Auditorias y consultoria", "Auditoria interna", "Hallazgos claros y mejora accionable", "Evidencia", "#C9A84C", "#2E86AB", "documents", "audit", 501),
    BlogAsset("auditorias-consultoria", "auditoria-proveedores-segunda-parte", "Auditorias y consultoria", "Auditoria a proveedores", "Evaluacion de segunda parte", "Supply", "#B08968", "#E8C97A", "truck", "supply", 502),
    BlogAsset("auditorias-consultoria", "diagnostico-brechas-iso", "Auditorias y consultoria", "Diagnostico de brechas", "Prioridades antes de certificar", "Gap analysis", "#9B5DE5", "#C9A84C", "target", "dashboard", 503),
    BlogAsset("auditorias-consultoria", "plan-accion-correctiva", "Auditorias y consultoria", "Accion correctiva", "Plan, responsable y verificacion", "CAPA", "#EF476F", "#E8C97A", "checklist", "roadmap", 504),
    BlogAsset("auditorias-consultoria", "revision-direccion-sistema", "Auditorias y consultoria", "Revision por direccion", "Decision estrategica con datos", "Direccion", "#6C757D", "#C9A84C", "chart", "dashboard", 505),
    BlogAsset("sistemas-integrados-energia", "sgi-9001-14001-integracion", "Sistemas integrados", "Sistema integrado", "ISO 9001 + ISO 14001 en un SGI", "SGI", "#06D6A0", "#C9A84C", "flow", "process", 601),
    BlogAsset("sistemas-integrados-energia", "iso-50001-energia-industrial", "Sistemas integrados", "ISO 50001 energia", "Eficiencia y control energetico", "Energia", "#FFD166", "#7B1E22", "bolt", "factory", 602),
    BlogAsset("sistemas-integrados-energia", "objetivos-metas-programas", "Sistemas integrados", "Objetivos y metas", "Programas medibles de cumplimiento", "OKR", "#118C8B", "#E8C97A", "target", "roadmap", 603),
    BlogAsset("sistemas-integrados-energia", "cadena-suministro-sostenible", "Sistemas integrados", "Cadena sostenible", "Riesgo, desempeno y proveedores", "Suministro", "#5E8C61", "#C9A84C", "truck", "supply", 604),
    BlogAsset("sistemas-integrados-energia", "capacitacion-auditores-internos", "Sistemas integrados", "Auditores internos", "Formacion practica para equipos ISO", "Capacitacion", "#4D908E", "#E8C97A", "people", "orbits", 605),
]


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def rgba(value: str, alpha: int) -> tuple[int, int, int, int]:
    r, g, b = hex_to_rgb(value)
    return r, g, b, alpha


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def font(size: int, bold: bool = False, mono: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_MONO if mono else (FONT_BOLD if bold else FONT_REGULAR)
    return ImageFont.truetype(path, size)


def rounded_panel(size: tuple[int, int], radius: int, fill: tuple[int, int, int, int], outline=None, width: int = 2) -> Image.Image:
    panel = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(panel)
    d.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=fill, outline=outline, width=width)
    return panel


def paste_blur_glow(base: Image.Image, center: tuple[int, int], color: str, radius: int, alpha: int) -> None:
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    x, y = center
    d.ellipse((x - radius, y - radius, x + radius, y + radius), fill=rgba(color, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    base.alpha_composite(glow)


def draw_gradient(asset: BlogAsset) -> Image.Image:
    top = hex_to_rgb(BRAND_WINE_DARK)
    mid = hex_to_rgb(asset.accent)
    bottom = hex_to_rgb("#121419")
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            vertical = y / (H - 1)
            diagonal = (x * 0.42 + y * 0.58) / (W * 0.42 + H * 0.58)
            t = min(1, max(0, vertical * 0.65 + diagonal * 0.35))
            if t < 0.56:
                color = blend(top, mid, t / 0.56)
            else:
                color = blend(mid, bottom, (t - 0.56) / 0.44)
            darken = 0.56 + 0.28 * math.sin((x / W) * math.pi)
            color = tuple(int(c * darken) for c in color)
            px[x, y] = color
    return img.convert("RGBA")


def add_texture(img: Image.Image, seed: int) -> None:
    random.seed(seed)
    noise = Image.effect_noise((W, H), 28).convert("L")
    noise = ImageEnhance.Contrast(noise).enhance(1.15)
    noise_rgba = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    noise_rgba.putalpha(noise.point(lambda p: int(p * 0.08)))
    img.alpha_composite(noise_rgba)

    vignette = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(vignette)
    d.ellipse((-320, -260, W + 280, H + 360), fill=190)
    vignette = ImageEnhance.Contrast(vignette.filter(ImageFilter.GaussianBlur(130))).enhance(1.6)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 145))
    overlay.putalpha(Image.eval(vignette, lambda p: 150 - int(p * 0.72)))
    img.alpha_composite(overlay)


def draw_grid(draw: ImageDraw.ImageDraw, color: str, seed: int, alpha: int = 32) -> None:
    random.seed(seed)
    spacing = 72
    for x in range(-200, W + 240, spacing):
        draw.line((x, 0, x + 360, H), fill=rgba(color, alpha), width=1)
    for y in range(40, H, spacing):
        draw.line((0, y, W, y + 42), fill=rgba("#FFFFFF", 18), width=1)
    for _ in range(42):
        x = random.randint(720, W - 80)
        y = random.randint(80, H - 80)
        r = random.choice([2, 3, 4])
        draw.ellipse((x - r, y - r, x + r, y + r), fill=rgba(color, random.randint(45, 95)))


def draw_factory(draw: ImageDraw.ImageDraw, accent: str, y: int = 665) -> None:
    fill = (14, 17, 20, 178)
    draw.rectangle((0, y + 95, W, H), fill=fill)
    xs = [920, 980, 980, 1040, 1040, 1100, 1100, 1240, 1240, 1320, 1320, 1510, 1510, W, W, y]
    pts = [(860, y + 95), (920, y + 40), (920, y + 95), (980, y + 35), (980, y + 95), (1045, y + 18), (1045, y + 95), (1140, y + 95), (1140, y - 30), (1195, y - 30), (1195, y + 95), (1280, y + 95), (1280, y - 75), (1335, y - 75), (1335, y + 95), (W, y + 95), (W, H), (860, H)]
    draw.polygon(pts, fill=(10, 12, 14, 205))
    for x in [930, 997, 1065, 1162, 1298]:
        draw.rectangle((x, y + 60, x + 30, y + 78), fill=rgba(accent, 110))
    for x in [1154, 1292]:
        draw.rectangle((x, y - 92, x + 62, y - 77), fill=(9, 11, 13, 185))
        draw.line((x + 4, y - 98, x + 56, y - 98), fill=rgba(BRAND_GOLD, 80), width=3)


def draw_circuit(draw: ImageDraw.ImageDraw, accent: str, seed: int) -> None:
    random.seed(seed)
    for _ in range(22):
        x = random.randint(700, 1500)
        y = random.randint(90, 780)
        length = random.randint(70, 190)
        direction = random.choice([(1, 0), (-1, 0), (0, 1), (0, -1)])
        x2, y2 = x + direction[0] * length, y + direction[1] * length
        draw.line((x, y, x2, y2), fill=rgba(accent, 70), width=2)
        draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=rgba("#FFFFFF", 78))
        draw.ellipse((x2 - 4, y2 - 4, x2 + 4, y2 + 4), fill=rgba(accent, 120))
        if random.random() > 0.35:
            bend = (x2 + random.choice([-60, 60]), y2)
            draw.line((x2, y2, bend[0], bend[1]), fill=rgba(accent, 52), width=2)


def draw_orbits(draw: ImageDraw.ImageDraw, accent: str, seed: int) -> None:
    random.seed(seed)
    cx, cy = 1130, 430
    for i in range(9):
        w = 260 + i * 58
        h = 95 + i * 26
        bbox = (cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2)
        start = random.randint(0, 120)
        draw.arc(bbox, start=start, end=start + 260, fill=rgba(accent, 36 + i * 5), width=2)
    for ang in range(0, 360, 45):
        r = 210 + (ang % 90)
        x = cx + math.cos(math.radians(ang)) * r
        y = cy + math.sin(math.radians(ang)) * r * 0.34
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=rgba(BRAND_GOLD_LIGHT, 150))


def draw_process(draw: ImageDraw.ImageDraw, accent: str) -> None:
    y0 = 300
    for i, label in enumerate(["PLAN", "DO", "CHECK", "ACT"]):
        x = 770 + i * 175
        draw.rounded_rectangle((x, y0 + (i % 2) * 60, x + 138, y0 + 84 + (i % 2) * 60), radius=18, fill=(255, 255, 255, 24), outline=rgba(accent, 105), width=2)
        draw.text((x + 26, y0 + 28 + (i % 2) * 60), label, font=font(22, True), fill=rgba("#FFFFFF", 220))
        if i < 3:
            draw.line((x + 145, y0 + 42 + (i % 2) * 60, x + 168, y0 + 42 + ((i + 1) % 2) * 60), fill=rgba(BRAND_GOLD_LIGHT, 150), width=4)


def draw_dashboard(draw: ImageDraw.ImageDraw, accent: str) -> None:
    x0, y0 = 820, 205
    draw.rounded_rectangle((x0, y0, x0 + 560, y0 + 420), radius=34, fill=(255, 255, 255, 30), outline=rgba("#FFFFFF", 65), width=2)
    for i in range(4):
        x = x0 + 42 + i * 124
        h = 58 + i * 31
        draw.rounded_rectangle((x, y0 + 310 - h, x + 70, y0 + 310), radius=12, fill=rgba(accent, 95 + i * 18))
    points = []
    for i in range(8):
        points.append((x0 + 60 + i * 62, y0 + 112 + int(math.sin(i * 0.85) * 45) + (i % 3) * 18))
    draw.line(points, fill=rgba(BRAND_GOLD_LIGHT, 190), width=5, joint="curve")
    for x, y in points:
        draw.ellipse((x - 8, y - 8, x + 8, y + 8), fill=rgba("#FFFFFF", 210))
    for i in range(3):
        draw.rounded_rectangle((x0 + 390, y0 + 250 + i * 43, x0 + 510, y0 + 268 + i * 43), radius=9, fill=rgba("#FFFFFF", 48))


def draw_supply(draw: ImageDraw.ImageDraw, accent: str) -> None:
    pts = [(820, 585), (1010, 460), (1210, 520), (1390, 385)]
    draw.line(pts, fill=rgba(BRAND_GOLD_LIGHT, 140), width=5, joint="curve")
    for x, y in pts:
        draw.rounded_rectangle((x - 58, y - 40, x + 58, y + 40), radius=18, fill=(255, 255, 255, 28), outline=rgba(accent, 120), width=2)
        draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=rgba(BRAND_GOLD_LIGHT, 210))


def draw_audit(draw: ImageDraw.ImageDraw, accent: str) -> None:
    for i in range(3):
        x, y = 870 + i * 112, 235 + i * 52
        draw.rounded_rectangle((x, y, x + 340, y + 250), radius=22, fill=(255, 255, 255, 32), outline=rgba("#FFFFFF", 60), width=2)
        draw.line((x + 42, y + 72, x + 268, y + 72), fill=rgba(accent, 120), width=4)
        for row in range(3):
            yy = y + 112 + row * 40
            draw.rectangle((x + 42, yy - 10, x + 62, yy + 10), outline=rgba(BRAND_GOLD_LIGHT, 155), width=3)
            draw.line((x + 82, yy, x + 255, yy), fill=rgba("#FFFFFF", 82), width=3)
    draw.arc((1195, 505, 1405, 715), 210, 520, fill=rgba(BRAND_GOLD_LIGHT, 180), width=12)
    draw.line((1360, 668, 1458, 762), fill=rgba(BRAND_GOLD_LIGHT, 180), width=18)


def draw_eco(draw: ImageDraw.ImageDraw, accent: str, seed: int) -> None:
    random.seed(seed)
    for i in range(24):
        x = random.randint(760, 1480)
        y = random.randint(180, 710)
        size = random.randint(18, 54)
        draw.ellipse((x - size, y - size // 2, x + size, y + size // 2), fill=rgba(accent, random.randint(30, 80)))
        draw.line((x - size // 2, y + size // 4, x + size // 2, y - size // 4), fill=rgba("#FFFFFF", 40), width=1)
    draw.arc((890, 220, 1360, 690), 35, 322, fill=rgba(BRAND_GOLD_LIGHT, 135), width=5)
    draw.arc((940, 265, 1310, 640), 210, 515, fill=rgba(accent, 120), width=5)


def draw_roadmap(draw: ImageDraw.ImageDraw, accent: str) -> None:
    x0, y0 = 820, 290
    points = [(x0, y0 + 220), (x0 + 135, y0 + 88), (x0 + 305, y0 + 150), (x0 + 480, y0 + 28), (x0 + 620, y0 + 180)]
    draw.line(points, fill=rgba(BRAND_GOLD_LIGHT, 150), width=6, joint="curve")
    for i, (x, y) in enumerate(points, 1):
        draw.ellipse((x - 30, y - 30, x + 30, y + 30), fill=rgba(accent, 160), outline=rgba("#FFFFFF", 105), width=2)
        draw.text((x - 8, y - 13), str(i), font=font(24, True), fill=(255, 255, 255, 235))


def draw_documents(draw: ImageDraw.ImageDraw, accent: str) -> None:
    for i in range(4):
        x = 910 + i * 72
        y = 210 + i * 38
        draw.rounded_rectangle((x, y, x + 330, y + 430), radius=26, fill=(255, 255, 255, 25 + i * 8), outline=rgba("#FFFFFF", 60 + i * 9), width=2)
        draw.line((x + 40, y + 92, x + 250, y + 92), fill=rgba(accent, 128), width=4)
        for row in range(5):
            draw.line((x + 42, y + 145 + row * 44, x + 278, y + 145 + row * 44), fill=rgba("#FFFFFF", 68), width=3)


PATTERNS = {
    "grid": lambda draw, asset: draw_grid(draw, asset.accent, asset.seed),
    "factory": lambda draw, asset: (draw_grid(draw, asset.accent, asset.seed, 24), draw_factory(draw, asset.accent)),
    "circuit": lambda draw, asset: (draw_grid(draw, asset.accent, asset.seed, 20), draw_circuit(draw, asset.accent, asset.seed)),
    "orbits": lambda draw, asset: draw_orbits(draw, asset.accent, asset.seed),
    "process": lambda draw, asset: (draw_grid(draw, asset.accent, asset.seed, 22), draw_process(draw, asset.accent)),
    "dashboard": lambda draw, asset: draw_dashboard(draw, asset.accent),
    "supply": lambda draw, asset: draw_supply(draw, asset.accent),
    "audit": lambda draw, asset: draw_audit(draw, asset.accent),
    "eco": lambda draw, asset: (draw_grid(draw, asset.accent, asset.seed, 20), draw_eco(draw, asset.accent, asset.seed)),
    "roadmap": lambda draw, asset: draw_roadmap(draw, asset.accent),
    "documents": lambda draw, asset: draw_documents(draw, asset.accent),
}


def draw_icon(draw: ImageDraw.ImageDraw, icon: str, box: tuple[int, int, int, int], accent: str) -> None:
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
    w, h = x2 - x1, y2 - y1
    line = rgba("#FFFFFF", 218)
    accent_fill = rgba(accent, 145)
    gold = rgba(BRAND_GOLD_LIGHT, 210)

    if icon == "checklist":
        draw.rounded_rectangle((x1 + 25, y1 + 18, x2 - 20, y2 - 15), radius=28, outline=line, width=6, fill=rgba("#FFFFFF", 18))
        for i in range(3):
            yy = y1 + 82 + i * 70
            draw.line((x1 + 62, yy, x1 + 82, yy + 20, x1 + 120, yy - 24), fill=gold, width=7, joint="curve")
            draw.line((x1 + 146, yy - 4, x2 - 68, yy - 4), fill=line, width=5)
    elif icon == "target":
        for r in [120, 82, 44]:
            draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=line if r != 82 else gold, width=6)
        draw.line((cx - 138, cy, cx + 138, cy), fill=accent_fill, width=4)
        draw.line((cx, cy - 138, cx, cy + 138), fill=accent_fill, width=4)
    elif icon == "documents":
        for i in range(3):
            off = i * 28
            draw.rounded_rectangle((x1 + 54 + off, y1 + 28 + off, x2 - 42 + off, y2 - 52 + off), radius=22, outline=line, width=5, fill=rgba("#FFFFFF", 16 + i * 10))
            draw.line((x1 + 95 + off, y1 + 102 + off, x2 - 95 + off, y1 + 102 + off), fill=gold, width=5)
            draw.line((x1 + 95 + off, y1 + 150 + off, x2 - 90 + off, y1 + 150 + off), fill=rgba("#FFFFFF", 130), width=4)
    elif icon == "flow":
        nodes = [(cx - 120, cy), (cx, cy - 80), (cx + 120, cy), (cx, cy + 82)]
        for a, b in zip(nodes, nodes[1:] + nodes[:1]):
            draw.line((a[0], a[1], b[0], b[1]), fill=gold, width=6)
        for i, (x, y) in enumerate(nodes):
            draw.rounded_rectangle((x - 48, y - 38, x + 48, y + 38), radius=18, outline=line, width=5, fill=rgba(accent, 90 + i * 20))
    elif icon == "chart":
        draw.line((x1 + 55, y2 - 55, x2 - 35, y2 - 55), fill=line, width=6)
        draw.line((x1 + 55, y1 + 45, x1 + 55, y2 - 55), fill=line, width=6)
        pts = [(x1 + 86, y2 - 120), (x1 + 170, y2 - 190), (x1 + 245, y2 - 130), (x1 + 340, y2 - 260), (x2 - 62, y2 - 205)]
        draw.line(pts, fill=gold, width=9, joint="curve")
        for x, y in pts:
            draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=line)
    elif icon == "leaf":
        draw.ellipse((cx - 130, cy - 90, cx + 110, cy + 115), outline=line, width=7)
        draw.line((cx - 82, cy + 84, cx + 98, cy - 78), fill=gold, width=7)
        for i in range(4):
            draw.arc((cx - 80 + i * 14, cy - 80 + i * 22, cx + 68 + i * 12, cy + 58 + i * 22), 205, 290, fill=rgba("#FFFFFF", 110), width=3)
    elif icon == "cycle":
        for a in [30, 150, 270]:
            r = 112
            x = cx + math.cos(math.radians(a)) * r
            y = cy + math.sin(math.radians(a)) * r
            draw.arc((cx - 145, cy - 145, cx + 145, cy + 145), a, a + 72, fill=line, width=9)
            draw.polygon([(x, y), (x - 18, y - 30), (x + 24, y - 18)], fill=gold)
        draw.ellipse((cx - 50, cy - 50, cx + 50, cy + 50), outline=rgba(accent, 180), width=6)
    elif icon == "factory":
        base_y = cy + 88
        pts = [(x1 + 35, base_y), (x1 + 35, cy - 10), (x1 + 112, cy - 62), (x1 + 112, cy - 10), (x1 + 198, cy - 70), (x1 + 198, cy - 10), (x1 + 292, cy - 74), (x1 + 292, base_y), (x2 - 35, base_y), (x2 - 35, cy - 130), (x2 - 4, cy - 130), (x2 - 4, base_y)]
        draw.polygon(pts, outline=line, fill=rgba("#FFFFFF", 18))
        for x in [x1 + 70, x1 + 148, x1 + 228, x1 + 326]:
            draw.rectangle((x, base_y - 58, x + 42, base_y - 22), fill=accent_fill)
    elif icon == "scale":
        draw.line((cx, y1 + 35, cx, y2 - 55), fill=line, width=7)
        draw.line((cx - 115, y1 + 92, cx + 115, y1 + 92), fill=gold, width=7)
        for side in [-1, 1]:
            px = cx + side * 95
            draw.line((px, y1 + 92, px + side * 42, cy + 52), fill=line, width=4)
            draw.line((px, y1 + 92, px - side * 42, cy + 52), fill=line, width=4)
            draw.arc((px - 68, cy + 24, px + 68, cy + 118), 0, 180, fill=line, width=6)
        draw.line((cx - 82, y2 - 55, cx + 82, y2 - 55), fill=line, width=7)
    elif icon == "truck":
        draw.rounded_rectangle((x1 + 35, cy - 58, cx + 55, cy + 58), radius=18, outline=line, width=6, fill=rgba("#FFFFFF", 16))
        draw.polygon([(cx + 55, cy - 35), (cx + 150, cy - 35), (cx + 196, cy + 18), (cx + 196, cy + 58), (cx + 55, cy + 58)], outline=line, fill=rgba(accent, 70))
        for wx in [x1 + 104, cx + 142]:
            draw.ellipse((wx - 25, cy + 38, wx + 25, cy + 88), outline=gold, width=7)
    elif icon == "shield":
        pts = [(cx, y1 + 28), (x2 - 52, y1 + 88), (x2 - 82, cy + 125), (cx, y2 - 18), (x1 + 82, cy + 125), (x1 + 52, y1 + 88)]
        draw.polygon(pts, outline=line, fill=rgba(accent, 85))
        draw.line((cx - 72, cy, cx - 18, cy + 54, cx + 92, cy - 66), fill=gold, width=10, joint="curve")
    elif icon == "network":
        nodes = [(cx - 120, cy - 70), (cx, cy - 130), (cx + 125, cy - 50), (cx + 92, cy + 95), (cx - 82, cy + 110), (cx - 10, cy)]
        for i, a in enumerate(nodes):
            for b in nodes[i + 1 :]:
                if random.random() > 0.48:
                    draw.line((a[0], a[1], b[0], b[1]), fill=rgba("#FFFFFF", 66), width=3)
        for x, y in nodes:
            draw.ellipse((x - 18, y - 18, x + 18, y + 18), fill=rgba(accent, 160), outline=line, width=3)
    elif icon == "pulse":
        pts = [(x1 + 34, cy), (x1 + 120, cy), (x1 + 155, cy - 76), (x1 + 210, cy + 92), (x1 + 270, cy - 50), (x1 + 325, cy), (x2 - 34, cy)]
        draw.line(pts, fill=gold, width=9, joint="curve")
        draw.rounded_rectangle((x1 + 38, y1 + 42, x2 - 38, y2 - 42), radius=34, outline=line, width=5)
    elif icon == "lock":
        draw.rounded_rectangle((cx - 112, cy - 10, cx + 112, cy + 132), radius=26, outline=line, width=7, fill=rgba(accent, 80))
        draw.arc((cx - 82, cy - 128, cx + 82, cy + 60), 180, 360, fill=line, width=8)
        draw.ellipse((cx - 14, cy + 48, cx + 14, cy + 76), fill=gold)
        draw.rectangle((cx - 6, cy + 70, cx + 6, cy + 104), fill=gold)
    elif icon == "control":
        for i in range(3):
            y = y1 + 78 + i * 78
            draw.line((x1 + 78, y, x2 - 78, y), fill=line, width=5)
            knob_x = x1 + 150 + i * 95
            draw.ellipse((knob_x - 24, y - 24, knob_x + 24, y + 24), fill=rgba(accent, 150), outline=gold, width=4)
    elif icon == "helmet":
        draw.arc((cx - 135, cy - 110, cx + 135, cy + 130), 180, 360, fill=line, width=12)
        draw.rectangle((cx - 145, cy + 12, cx + 145, cy + 48), fill=rgba(accent, 135), outline=line, width=5)
        draw.line((cx, cy - 102, cx, cy + 38), fill=gold, width=7)
        draw.arc((cx - 68, cy - 90, cx + 68, cy + 72), 180, 360, fill=gold, width=6)
    elif icon == "warning":
        pts = [(cx, y1 + 35), (x2 - 45, y2 - 34), (x1 + 45, y2 - 34)]
        draw.polygon(pts, outline=line, fill=rgba(accent, 112))
        draw.line((cx, cy - 54, cx, cy + 44), fill=gold, width=13)
        draw.ellipse((cx - 9, cy + 80, cx + 9, cy + 98), fill=gold)
    elif icon == "magnify":
        draw.ellipse((cx - 105, cy - 105, cx + 105, cy + 105), outline=line, width=11)
        draw.line((cx + 78, cy + 78, cx + 170, cy + 170), fill=gold, width=17)
        draw.line((cx - 58, cy - 10, cx - 12, cy + 42, cx + 78, cy - 58), fill=rgba(accent, 180), width=8)
    elif icon == "people":
        for off, scale in [(-88, 0.82), (0, 1.0), (88, 0.82)]:
            r = int(35 * scale)
            x = cx + off
            draw.ellipse((x - r, cy - 108 - r, x + r, cy - 108 + r), outline=line, width=5, fill=rgba(accent, 65))
            draw.rounded_rectangle((x - int(48 * scale), cy - 48, x + int(48 * scale), cy + 92), radius=32, outline=line, width=5, fill=rgba("#FFFFFF", 14))
        draw.arc((cx - 190, cy - 12, cx + 190, cy + 170), 205, 335, fill=gold, width=6)
    elif icon == "bolt":
        pts = [(cx + 10, y1 + 25), (cx - 95, cy + 22), (cx - 10, cy + 22), (cx - 60, y2 - 22), (cx + 100, cy - 24), (cx + 4, cy - 24)]
        draw.polygon(pts, fill=gold, outline=line)
    else:
        draw.ellipse((cx - 115, cy - 115, cx + 115, cy + 115), outline=line, width=7)


def wrap_title(text: str, max_chars: int = 22) -> list[str]:
    return textwrap.wrap(text, width=max_chars, break_long_words=False) or [text]


def draw_text_block(draw: ImageDraw.ImageDraw, asset: BlogAsset) -> None:
    x, y = 112, 112
    draw.text((x, y), "INDUSECC", font=font(24, True, mono=True), fill=rgba(BRAND_GOLD_LIGHT, 235))
    draw.line((x, y + 45, x + 94, y + 45), fill=rgba(asset.accent, 200), width=5)
    draw.text((x, y + 76), asset.category.upper(), font=font(18, True), fill=rgba("#FFFFFF", 170))

    title_lines = wrap_title(asset.title, 18)
    title_y = y + 135
    for i, line in enumerate(title_lines[:3]):
        draw.text((x, title_y + i * 68), line, font=font(58, True), fill=rgba("#FFFFFF", 238))

    subtitle_y = title_y + len(title_lines[:3]) * 72 + 18
    for i, line in enumerate(wrap_title(asset.subtitle, 34)[:2]):
        draw.text((x, subtitle_y + i * 34), line, font=font(27), fill=rgba("#FFFFFF", 182))

    pill_y = subtitle_y + 92
    label = asset.tag.upper()
    bbox = draw.textbbox((0, 0), label, font=font(18, True))
    draw.rounded_rectangle((x, pill_y, x + (bbox[2] - bbox[0]) + 46, pill_y + 46), radius=23, fill=rgba("#FFFFFF", 26), outline=rgba(BRAND_GOLD_LIGHT, 110), width=2)
    draw.text((x + 23, pill_y + 12), label, font=font(18, True), fill=rgba(BRAND_GOLD_LIGHT, 225))


def draw_metric_strip(draw: ImageDraw.ImageDraw, asset: BlogAsset) -> None:
    labels = ["Diagnostico", "Implementacion", "Auditoria"]
    x0, y0 = 112, 742
    for i, label in enumerate(labels):
        x = x0 + i * 190
        draw.ellipse((x, y0 + 7, x + 13, y0 + 20), fill=rgba(asset.accent, 220))
        draw.text((x + 26, y0), label, font=font(18, True), fill=rgba("#FFFFFF", 164))
    draw.text((112, 800), "Imagen original generada para blogs INDUSECC", font=font(17), fill=rgba("#FFFFFF", 105))


def render_asset(asset: BlogAsset) -> Image.Image:
    img = draw_gradient(asset)
    paste_blur_glow(img, (1170, 360), asset.accent, 340, 118)
    paste_blur_glow(img, (1460, 760), BRAND_GOLD, 250, 65)
    paste_blur_glow(img, (220, 210), BRAND_WINE, 260, 80)
    add_texture(img, asset.seed)

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.polygon([(650, 0), (W, 0), (W, H), (760, H), (970, 520)], fill=(255, 255, 255, 18))
    d.polygon([(0, H), (0, 690), (560, 820), (720, H)], fill=(0, 0, 0, 90))
    d.line((690, 0, 1050, H), fill=rgba(BRAND_GOLD_LIGHT, 50), width=2)
    d.line((722, 0, 1082, H), fill=rgba("#FFFFFF", 28), width=1)
    PATTERNS.get(asset.pattern, PATTERNS["grid"])(d, asset)
    draw_factory(d, asset.accent, y=718) if asset.pattern not in {"factory", "eco"} else None
    img.alpha_composite(overlay)

    motif = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    md = ImageDraw.Draw(motif)
    panel = (850, 182, 1376, 682)
    md.rounded_rectangle(panel, radius=52, fill=(255, 255, 255, 25), outline=rgba("#FFFFFF", 70), width=2)
    md.rounded_rectangle((panel[0] + 24, panel[1] + 24, panel[2] - 24, panel[3] - 24), radius=40, outline=rgba(asset.secondary, 110), width=3)
    draw_icon(md, asset.icon, (panel[0] + 70, panel[1] + 72, panel[2] - 70, panel[3] - 72), asset.accent)
    motif = motif.filter(ImageFilter.GaussianBlur(0.15))
    img.alpha_composite(motif)

    text_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(text_layer)
    td.rectangle((0, 0, 735, H), fill=(0, 0, 0, 92))
    td.rectangle((0, 0, 735, H), fill=rgba(BRAND_WINE_DARK, 42))
    draw_text_block(td, asset)
    draw_metric_strip(td, asset)
    img.alpha_composite(text_layer)

    final = img.convert("RGB")
    return final


def write_readme(paths: list[tuple[BlogAsset, Path]]) -> None:
    lines = [
        "# Imágenes para blogs INDUSECC",
        "",
        "Pack de imágenes originales para futuros artículos del blog. Fueron generadas de forma programática con formas, gradientes y texturas propias, sin descargar stock ni reutilizar material de terceros.",
        "",
        "- Formato: `webp`",
        "- Tamaño: `1600x900`",
        "- Uso sugerido: portada de blog, cards, banners, miniaturas y redes sociales.",
        "- Derechos: creadas para este proyecto; libres de stock/copyright externo.",
        "",
        "## Catálogo",
        "",
    ]
    current = None
    for asset, path in paths:
        if asset.folder != current:
            current = asset.folder
            lines.append(f"### {asset.category}")
            lines.append("")
        rel = path.relative_to(ROOT).as_posix()
        lines.append(f"- `{rel}` — {asset.title}: {asset.subtitle}.")
    lines.append("")
    lines.append("Nota: las fotos antiguas que ya estaban en `img_blogs/` se conservaron sin cambios.")
    (OUT_DIR / "README.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    generated: list[tuple[BlogAsset, Path]] = []
    for asset in ASSETS:
        folder = OUT_DIR / asset.folder
        folder.mkdir(parents=True, exist_ok=True)
        out = folder / f"{asset.slug}.webp"
        img = render_asset(asset)
        img.save(out, "WEBP", quality=92, method=6)
        generated.append((asset, out))
        print(out.relative_to(ROOT))
    write_readme(generated)
    print(f"\nGenerated {len(generated)} blog images.")


if __name__ == "__main__":
    main()
