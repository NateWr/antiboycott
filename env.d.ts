/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

// Type declaration for vite-imagetools image processor
// See: https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-965021959
declare module "*&imagetools" {
  const image: Record<array, any>
  export default image
}