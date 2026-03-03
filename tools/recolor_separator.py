import colorsys
from pathlib import Path

from PIL import Image


def recolor_to_palette(
    input_path: Path,
    output_path: Path | None = None,
    target_hex: str = "#ee4242",
    min_saturation: float = 0.15,
) -> Path:
    """
    Recolore um separador azul para a paleta baseada em `target_hex`.

    Estratégia:
    - Mantém o canal alpha (transparência) intacto.
    - Converte cada pixel visível para HSV.
    - Força o matiz (hue) para o da cor alvo, preservando saturação/valor originais.
    - Pixels de saturação muito baixa (quase branco/cinza) são deixados como estão
      para não sujar o fundo.
    """

    input_path = Path(input_path)
    if output_path is None:
        output_path = input_path
    else:
        output_path = Path(output_path)

    # Normaliza hex (#rrggbb → valores 0–1)
    target_hex = target_hex.lstrip("#")
    r = int(target_hex[0:2], 16) / 255.0
    g = int(target_hex[2:4], 16) / 255.0
    b = int(target_hex[4:6], 16) / 255.0
    target_h, _, _ = colorsys.rgb_to_hsv(r, g, b)

    im = Image.open(input_path).convert("RGBA")
    pixels = im.load()

    width, height = im.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # Mantém pixels totalmente transparentes
            if a == 0:
                continue

            rf, gf, bf = r / 255.0, g / 255.0, b / 255.0
            h, s, v = colorsys.rgb_to_hsv(rf, gf, bf)

            # Não mexe em quase-brancos/cinzas para preservar o fundo
            if s < min_saturation:
                continue

            # Força o matiz para o da paleta escolhida
            nr, ng, nb = colorsys.hsv_to_rgb(target_h, s, v)

            pixels[x, y] = (
                int(round(nr * 255)),
                int(round(ng * 255)),
                int(round(nb * 255)),
                a,
            )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(output_path)
    return output_path


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[1]
    src = project_root / "public" / "separador" / "separador.png"

    # Se quiser preservar o original, descomente a linha abaixo:
    # backup = src.with_name("separador-original.png")
    # if not backup.exists():
    #     src.replace(backup)
    #
    # e então use `backup` como entrada da função.

    recolor_to_palette(src)
    print(f"Recolor concluído em: {src}")

