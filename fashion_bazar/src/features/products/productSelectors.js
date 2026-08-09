export const selectProducts = (state) => state.products.items;

export const selectProductsLoading = (state) =>
  state.products.loading;

export const selectProductsError = (state) =>
  state.products.error;











// import { useDispatch, useSelector } from "react-redux";

// import {
//   addProduct,
//   clearProducts,
//   removeProduct,
// } from "./features/products/productSlice";

// import {
//   selectProducts,
//   selectProductsLoading,
// } from "./features/products/productSelectors";

// function App() {
//   const dispatch = useDispatch();

//   const products = useSelector(selectProducts);
//   const loading = useSelector(selectProductsLoading);

//   const handleAddProduct = () => {
//     const newProduct = {
//       id: crypto.randomUUID(),
//       name: `Product ${products.length + 1}`,
//       price: 500,
//     };

//     dispatch(addProduct(newProduct));
//   };

//   return (
//     <main>
//       <h1>Redux Toolkit Test</h1>

//       <p>Loading: {loading ? "Yes" : "No"}</p>
//       <p>Total products: {products.length}</p>

//       <button type="button" onClick={handleAddProduct}>
//         Add Product
//       </button>

//       <button type="button" onClick={() => dispatch(clearProducts())}>
//         Clear Products
//       </button>

//       <div>
//         {products.map((product) => (
//           <div key={product.id}>
//             <h2>{product.name}</h2>
//             <p>${product.price}</p>

//             <button
//               type="button"
//               onClick={() => dispatch(removeProduct(product.id))}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// export default App;