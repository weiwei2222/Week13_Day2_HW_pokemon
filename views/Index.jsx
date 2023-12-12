const React = require("react");
const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

class Index extends React.Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div style={myStyle}>
        <h1>See All The Pokemon!</h1>
        <ul>
          {pokemon.map((pokemon, i) => {
            return (
              <li key={i}>
                <a href={`/pokemon/${i}`}>
                  Name:
                  <br />
                  {pokemon.name}
                  <br />
                  Img: <br />
                  <img src={pokemon.img} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
