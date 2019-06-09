# Re-siz-able

First things first, the [**demo**](http://resizable-demo.surge.sh).

Clone the repo and run `npm start` to run the demo locally.

## What is it?

Re-siz-able is a React library that gives your components an ability to become resizable. Mobile-friendly! 📱

## How?

When you wrap your components with the `<Resizer/>` component, handles appear. Drag them to change the dimensions of your component.

```
<Resizer >
  <Square />
</Resizer>
```

![Demo gif](/demo.gif)

## Just like that? 😳

There is actually more to it. There are two main ways of using **Re-siz-able**.

## Usage

### `<Resizer/>`

You are able to wrap an HTML element with `<Resizer/>` and it will work right away, no setup needed. You can pass props to configure its behavior. **It must receive only one child.** There is no limit for the wrapped component's children.

#### You can configure `<Resizer/>` using the following props:

**`handles`** – an array of names of handles to render; the default is `['left', 'right']`. The possible values are: `right`, `left`, `top`, `bottom`, `top-left`, `top-right`, `bottom-right`, `bottom-left`. An array with at least one handle name must be supplied to enable the functionality – no empty arrays.

**`minWidth`** – the minimum width of the wrapped component in pixels; the default is `100`.

**`maxWidth`** – the maximum width of the wrapped component in pixels; the default is `1000`.

**`minHeight`** – the minimum height of the wrapped component in pixels; the default is `100`.

**`maxHeight`** – the maximum height of the wrapped component in pixels; the default is `1000`.

**`margin`** – The page margin for defining the maximum possible width of a resizable element if its width is larger that the screen width. Useful for having a responsive, mobile-friendly component with minimum setup; the default is `32`.

**`hideHandles`** – If `true` the handles become transparent; the default is `false`.

**`preserveRatio`** – If `true` the dimension ratio of the wrapped component is preserved when resizing; the default is `false`. Works only with bi-directional handles.

**`customHandle`** – A custom handle component can be supplied. It will receive the `position`, `hideHandles`, `onMouseDown` and `onTouchStartprops` props. `position` has the same values as `handles`, `hideHandles` is boolean. You can take a look at an example in the `/components` folder.

**`className`** – A class name to customize the style of the wrapper inside `<Resizer/>`.

### `useResizer` hook

The `useResizer` hook can be used inside a React component to provide tools, required for enabling the functionality of being resizable. It is also used internally by the `Resizer` component.

#### The hook returns:

**`elementRef`** – a React ref that can be passed to an element whose dimensions you want to be able to modify. It should be supplied **only** if the element has either `width` or `height` defined. Can be used together with the `defaultWidth` or `defaultHeight` hook config options. However, if both of them are present in the config, there is no need for the `elementRef`. The config options have higher precedence.

**`width`** – the current width of the component in pixels. The initial value is defined by either the `defaultWidth` config option if it is present or the component's style. Must be passed to an element's inline style.

**`height`** – the current height of the component in pixels. The initial value is defined by either the `defaultHeight` config option if it is present or the component's style. Must be passed to an element's inline style.

**`handleMouseDown()`** – the function that must be passed to an element, which should serve as a handle, and triggered `onMouseDown`. The function accepts a handle name as the parameter. The acceptable handle names are listed above. After receiving the function, an element behaves according to the passed handle name, changing the `width` and `height` variables returned by the hook.

#### The hook accepts a config object with the following optional properties:

**`minWidth`** – the minimum width in pixels; the default is `100`.

**`maxWidth`** – the maximum width in pixels; the default is `1000`.

**`minHeight`** – the minimum height in pixels; the default is `100`.

**`maxHeight`** – the maximum height in pixels; the default is `1000`.

**`margin`** – The page margin for defining the maximum possible width of a resizable element if its width is larger that the screen width. Useful for having a responsive, mobile-friendly component with minimum setup; the default is `32`.

**`preserveRatio`** – If `true` the dimension ratio of the wrapped component is preserved when resizing; the default is `false`. Works only with bi-directional handles.

**`defaultWidth`** – the default element width in pixels; the default is `undefined`. Must be passed if the element has no defined with.

**`defaultHeight`** – the default height width in pixels; the default is `undefined`. Must be passed if the element has no defined height.

The hook opens many creative possibilities! You can use the received `width` and `height` for anything you want. You can use their values to adjust the font size when resizing a component or change its color! The freedom is yours. 🙌

🛑 **Be careful:** for both the `Resizer` component and the `useResizer` hook the child or the element the hook is used in have to have defined `width` and `height` to avoid unexpected results. It can be done either via a stylesheet or the`defaultWidth` and `defaultHeight` config options in the case of the hook. Nothing would crash if the dimensions are not defined but you might experience unwanted behavior.

---

Made by Leonid Grishchenin
