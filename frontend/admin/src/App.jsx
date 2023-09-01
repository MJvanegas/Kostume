import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dropdown from "./Components/Dropdown/Dropdown";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";

// Pages
import Error404 from "./pages/Error404";
// Pages Auth
import Login from "./pages/auth/Login";
// Pages Admin
import { Products, AddProduct, EditProduct } from "./pages/admin/Products";
import {
  Categories,
  AddCategory,
  EditCategory,
} from "./pages/admin/Categories";
import { Users, AddUser, EditUser } from "./pages/admin/Users";
import {
  References,
  AddReference,
  EditReferences,
} from "./pages/admin/References/";

function App() {
  const items = [
    {
      slug: "",
      anchor: "Ver Perfil",
    },

    {
      slug: "http://localhost:5173/",
      anchor: "Cerrar Sesión",
    },
  ];
  return (
    <>
      <Dropdown items={items} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />
            <Route path="references" element={<References />} />
            <Route path="references/add" element={<AddReference />} />
            <Route path="references/edit/:id" element={<EditReferences />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
