import "./App.css";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPass from "./pages/forgot_password";
import Dashboard from "./pages/dashboard";
import Categories from "./pages/categories";
import Decks from "./pages/decks";
import PFE from "./pages/pfe";
import Flashcards from "./pages/flashcards";
import Flashcard from "./pages/flashcard";
import FlashcardsByCategory from "./pages/flashcards_by_category";
import FlashcardsByDeck from "./pages/flashcards_by_deck";
import PageNotFound from "./pages/page_not_found";
import MainLayout from "./layouts/main_layout";
import PrivateRoutes from "./components/private_routes";

function FlashcardsInCategoryPage() {
  let { categoryId } = useParams();

  return (
    <MainLayout>
      <FlashcardsByCategory categoryId={categoryId} />
    </MainLayout>
  );
}

function FlashcardsInDeckPage() {
  let { deckId } = useParams();

  return (
    <MainLayout>
      <FlashcardsByDeck deckId={deckId} />
    </MainLayout>
  );

}

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <MainLayout>
                  <Categories />
                </MainLayout>
              }
            />
            <Route
              path="/pfe"
              element={
                <MainLayout>
                  <PFE />
                </MainLayout>
              }
            />

            <Route
              path="/decks"
              element={
                <MainLayout>
                  <Decks />
                </MainLayout>
              }
            />
            <Route
              path="/flashcards"
              element={
                <MainLayout>
                  <Flashcards />
                </MainLayout>
              }
            />
            <Route path="/flashcards/category">
              <Route path=":categoryId" element={<FlashcardsInCategoryPage />} />
            </Route>

            <Route path="/flashcards/deck">
              <Route path=":deckId" element={<FlashcardsInDeckPage />} />
            </Route>
            
          </Route>

          <Route path="/forgot-password" element={<ForgotPass />}></Route>
          <Route
            path="*"
            element={
              <MainLayout>
                <PageNotFound />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
