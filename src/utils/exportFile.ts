import { ExportData } from "src/types/file.model"

const exportFile = async ({ contentType, fileName, fileData }: ExportData) => {
  const linkSrc = await fetch(`data:${contentType};base64,${fileData}`)
  const dataUrl = URL.createObjectURL(await linkSrc.blob())

  const downloadLink = document.createElement('a')
  downloadLink.style.display = 'none'
  downloadLink.href = dataUrl
  downloadLink.download = fileName
  downloadLink.click()

  URL.revokeObjectURL(dataUrl)
  downloadLink.remove()
}

export default exportFile
