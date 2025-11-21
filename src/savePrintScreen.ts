import html2canvas from "html2canvas";
const isMobile = (): boolean => {
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
};

export const savePrintScreen = async (
  element: HTMLElement,
  currentLeague: string
): Promise<string> => {
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
    function getTodayDateString(): string {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}.${month}.${year}`;
    }
    const date = getTodayDateString();
    const nameFile = `${currentLeague + " " + date}.png`;
    const file = new File([blob], nameFile, { type: "image/png" });

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
        fallbackDownload(blob, nameFile);
        return "Изображение сохранено";
      }
    } else {
      fallbackDownload(blob, nameFile);
      return "Изображение сохранено";
    }
  } catch (error) {
    console.error("Ошибка сохранения:", error);
    return "Не удалось сохранить. Проверьте разрешения браузера.";
  }
};

const fallbackDownload = (blob: Blob, nameFile: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nameFile;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
