export const navRoutes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/dialog-html",
    title: "DialogHtml",
  },
  {
    path: "/dynamic-bg",
    title: "Dynamic Image bleed to BG",
  },
  {
    path: "/paralax-image",
    title: "NYI: Images displayed and layered behind content",
  },
  {
    path: "/date-time-translations",
    title: "Date Time Translations",
  },
  {
    path: "/progressive-styled-text",
    title: "Dynamic Text Styling",
  },
  {
    path: "/progressive-styled-text-css",
    title: "Dynamic Text Styling (CSS)",
  },
  {
    path: "/saving-canvas",
    title: "Saving from a Canvas",
  },
  {
    path: "/border-images",
    title: "NYI: Custom Border Images",
  },
  {
    path: "/tooltips",
    title: "Anchor CSS Tooltips"
  },
  {
    path: "/discrete-animations",
    title: "Discrete Animations"
  },
  {
    path: "/odd-truncations",
    title: "Odd Truncations"
  },
  {
    path: "/select-placeholders",
    title: "Select Placeholders"
  }
]

export function resolveRouteName(routeKey){
  const resolvedRouteIndex = navRoutes.findIndex(el => el.path === routeKey);
  if (resolvedRouteIndex === -1){
    return null;
  }

  return navRoutes[resolvedRouteIndex].title;
}
