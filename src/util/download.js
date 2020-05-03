export const download = (
    content,
    type,
    filename
) => {
    const a = document.createElement('a')
    a.style.display = "none";
    a.download = filename
    const fileBlob = new Blob([content], { type })
    const url = window.URL.createObjectURL(fileBlob)
    a.href = url
    // 触发点击
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    // 然后移除
    document.body.removeChild(a)
}