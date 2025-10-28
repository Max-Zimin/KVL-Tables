import html2canvas from "html2canvas";

export const printScreen = async (element: HTMLElement): Promise<string> => {
  if (!element) {
    console.error("Элемент не найден");
    return "Ошибка захвата изображения";
  }

  try {
    const options = {
      scale: 3, // Увеличивает разрешение (2x для Retina)
      useCORS: true, // Для изображений из других источников
      allowTaint: false, // Избегает искажений
      width: element.offsetWidth, // Явно задаёт ширину
      height: element.offsetHeight, // Явно задаёт высоту
    };
    const canvas = await html2canvas(element, options);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Не удалось создать blob");
        return "Ошибка захвата изображения";
      }

      const item = new ClipboardItem({ "image/png": blob });

      await navigator.clipboard.write([item]);
    });
  } catch (error) {
    console.error("Ошибка копирования:", error);
    return "Не удалось скопировать. Проверьте разрешения браузера.";
  }
  return "Изображение скопировано";
};
