import { useEffect, useState } from "react";
import { fetchImages } from "./api"

function Header() {
  return (
    <header className='hero is-dark is-bold'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>Cute Dog Images</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image'>
          <img src={props.src} alt='cute dog' />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <p>Loading...</p>
  );
}

function Gallery(props) {
  const { urls } = props;
  if (urls === null) {
    return <Loading />;
  }
  return (
    <div className='columns is-vcentered is-multiline'>
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        )
      })}
    </div>
  );
}

function Main() {
  // useState の引数は状態の初期値
  // useState の戻り値は 2 要素の配列であり、0 番目の要素は現在の状態の値、1 番目の要素は状態を更新するための関数
  // 状態を更新するたびにコンポーネントの関数が実行され、現在の状態に対応した JSX 式が返される
  const [urls, setUrls] = useState(null);
  // useEffect の第 1 引数には、副作用を起こす関数を渡す
  // useEffect の第 2 引数には、その副作用が依存する値のリストを配列で渡す
  // この配列のいずれかの値が、前に副作用を起こした時の値から変わっていたら、再度副作用を起こす
  // 空の配列を渡した場合は、最初にコンポーネントがレンダリングされた時の 1 回だけ副作用が起こる
  // 第 2 引数を省略すると、コンポーネントの再レンダリングのたびに副作用が起こる
  useEffect(() => {
    fetchImages('shiba').then((urls) => {
      setUrls(urls);
    });
  }, []);
  return (
    <main>
      <section className='section'>
        <div className='container'>
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href='https://dog.ceo/dog-api/about'>Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
