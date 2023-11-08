import { useForm } from 'react-hook-form';

function ReviewForm(props) {
  const { movieName, userName } = props;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/articles/submit_review/', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('successfully submitted')
        } else {
          // Error submitting review
          console.log('error submitted')
        }
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='b_score'>
        <label>Enter your score:</label>
        <input type='number' name='score' ref={register({ required: true })} style={{height:'60px', width:'70px',borderRadius:'20px'}}></input>
        {errors.score && <span>This field is required</span>}
      </div>
      <div>
        <input type='text' name='review' ref={register({ required: true })} className='b_enter'></input>
        {errors.review && <span>This field is required</span>}
      </div>
      <div>
        <button className='rev_button' type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
