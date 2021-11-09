import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
export const Answer = () => {
    const {quesid}=useParams();
    const host = process.env.REACT_APP_BACKEND_URL;
    let history = useHistory();
    const init = {
        answer: ""
    }
    const [answer, setAnswer] = useState(init);
    const [question, setQuestion] = useState({});
    const getQuestionDetails = async () => {
        const response = await fetch(`${host}/api/questions/getquestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                quesid
            })
        })
        const json = await response.json();
        setQuestion(json);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // api call
        const response = await fetch(`${host}/api/answers/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "question": quesid,
                "answer": answer.answer
            })
        });
        response.json();
        setAnswer(init);
    }

    const onChange = (e) => {
        setAnswer({...answer, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            getQuestionDetails();
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])
    // useEffect(()=>  {
    //     const get = async ()=> {
    //         await getQuestionDetails();
    //     }
    //     get();
    // })

    return (
        <div>
            <h2>{question.question}</h2>
            {question.answered ? "yes": "no"}
            <form>
                <label htmlFor="answer">Write your answer here</label>
                <input type="text" name="answer" id="answer" className="answer" value={answer.answer} onChange={onChange} />
            </form>
            <button type="submit"className="addAnswer" onClick={handleSubmit}>Submit</button>
        </div>
    )
}