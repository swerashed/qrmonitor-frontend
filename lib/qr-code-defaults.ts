export const DEFAULT_QR_OPTIONS = {
    type: "canvas" as const,
    shape: "square" as const,
    width: 300,
    height: 300,
    data: "",
    margin: 10,
    qrOptions: {
        typeNumber: 0 as const,
        mode: "Byte" as const,
        errorCorrectionLevel: "Q" as const,
    },
    imageOptions: {
        saveAsBlob: true,
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0,
        crossOrigin: "anonymous",
    },
    dotsOptions: {
        type: "rounded" as const,
        color: "#000000",
        roundSize: true,
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    cornersSquareOptions: {
        type: "" as any,
        color: "#000000",
    },
    cornersDotOptions: {
        type: "" as any,
        color: "#000000",
    },
    image: "",
}

export const DOT_STYLES = [
    { value: "square", label: "Square" },
    { value: "dots", label: "Dots" },
    { value: "rounded", label: "Rounded" },
    { value: "classy", label: "Classy" },
    { value: "classy-rounded", label: "Classy Rounded" },
    { value: "extra-rounded", label: "Extra Rounded" },
]

export const CORNER_SQUARE_STYLES = [
    { value: "none", label: "None" },
    { value: "square", label: "Square" },
    { value: "dot", label: "Dot" },
    { value: "extra-rounded", label: "Extra Rounded" },
]

export const CORNER_DOT_STYLES = [
    { value: "none", label: "None" },
    { value: "square", label: "Square" },
    { value: "dot", label: "Dot" },
]

export const ERROR_CORRECTION_LEVELS = [
    { value: "L", label: "Low (7%)", description: "Best for large QR codes" },
    { value: "M", label: "Medium (15%)", description: "Balanced option" },
    { value: "Q", label: "Quartile (25%)", description: "Recommended" },
    { value: "H", label: "High (30%)", description: "Best for small QR codes or with logos" },
]

export const QR_SHAPES = [
    { value: "square", label: "Square" },
    { value: "circle", label: "Circle" },
]

export type QRCodeOptions = typeof DEFAULT_QR_OPTIONS
