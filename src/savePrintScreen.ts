import html2canvas from "html2canvas";
const isMobile = (): boolean => {
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
  );
};

export const savePrintScreen = async (element: HTMLElement): Promise<string> => {
  if (!element) {
    console.error("Элемент не найден");
    return "Ошибка захвата изображения";
  }

  try {
    const options = {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
    const canvas = await html2canvas(element, options);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve));

    if (!blob) {
      console.error("Не удалось создать blob");
      return "Ошибка захвата изображения";
    }

    const file = new File([blob], "screenshot.png", { type: "image/png" });

    if (isMobile() && navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Скриншот",
          text: "Скриншот элемента",
          files: [file],
        });
        return "Изображение сохранено";
      } catch (shareError) {
        console.error("Ошибка при сохранении:", shareError);
        fallbackDownload(blob);
        return "Изображение сохранено";
      }
    } else {
      fallbackDownload(blob);
      return "Изображение сохранено";
    }
  } catch (error) {
    console.error("Ошибка сохранения:", error);
    return "Не удалось сохранить. Проверьте разрешения браузера.";
  }
};

const fallbackDownload = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "screenshot.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
