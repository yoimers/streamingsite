const Input = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: (props: any) => ({
      background: "brand.backgroundcolor2",
      _invalid: {
        borderWidth: "2px",
        borderColor: "red.300",
      },
      _focus: {
        borderWidth: "2px",
        borderColor: "brand.maincolor",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "outline",
  },
};
export default Input;

// borderRadius: "xl",
// ml: 6,
// background: "tomato",
// _focus: {
//   borderWidth: "2px",
//   borderColor: "brand.maincolor",
// },
