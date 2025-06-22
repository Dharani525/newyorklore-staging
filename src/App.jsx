import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"
import StoryDetails from "./pages/StoryDetails";
import StoriesForm from "./components/Form";
import Stories from "./pages/Stories";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Example Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/stories" element={<h2>Stories Page</h2>} /> */}
        <Route path="/stories/:id" element={<StoryDetails />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/submit" element={<StoriesForm />} />
        <Route path="/editstories/:id" element={<StoriesForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
