const React = require("react");

class Search extends React.Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div>
        <h1>Search Pokemon result page!</h1>
        <ul>
          {pokemon.length
            ? pokemon.map((pokemon, i) => {
                return (
                  <li key={i}>
                    <a href={`/pokemon/${pokemon._id}`}>
                      Name:
                      <br />
                      {pokemon.name}
                      <br />
                      Img: <br />
                      <img src={pokemon.img} />
                    </a>
                  </li>
                );
              })
            : "Sorry, can't find it."}
        </ul>
        <a href="/pokemon">back</a>
      </div>
    );
  }
}

module.exports = Search;
