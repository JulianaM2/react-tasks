const col = (w) => ({
  flex: `0 0  calc(${w}*100%/12)`,
  display: "flex",
  flexDirection: "column",
  margin: "10px 0px",
});

const badgeColor = (color) => ({
  backgroundColor: color
})

export {
  col,
  badgeColor
}