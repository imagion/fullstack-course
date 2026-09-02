const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.name1} {props.exercises1}
      </p>
      <p>
        {props.name2} {props.exercises2}
      </p>
      <p>
        {props.name3} {props.exercises3}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name1={props.part1.name} exercises1={props.part1.exercises} />
      <Part name2={props.part2.name} exercises2={props.part2.exercises} />
      <Part name3={props.part3.name} exercises3={props.part3.exercises} />
    </>
  );
};

const Total = (props) => {
  const total =
    props.part1.exercises + props.part2.exercises + props.part3.exercises;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
