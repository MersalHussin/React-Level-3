import {collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import Moment from 'react-moment';
function TasksSection({user}) {

  const [value, loading, error] = useCollection(collection(db, user.uid));




  if(loading){
    return(
      <h1>Loading</h1>
    )
  }

  if(error){
    return(
      <h1>Error</h1>
    )
  }
  if(user){

  return (
              <section className="all-tasks mt">
                 {value.docs.map((item) => (
                   <article key={item.id} dir="auto" className="task">
                  <Link to={`/edit-task/${item.id}`}>
                    <h2>{item.data().title}<span>({item.data().dataeils.length}) </span></h2>
                    <ul>
                        {item.data().dataeils.map((dateailsItem,  index) => (
                          <li key={dateailsItem}>{dateailsItem}</li>
                        ))}
                    </ul>
                    <p className="time">
                      
                        {
                          <Moment fromNow date={parseInt(item.data().id)}/>
  }
                     </p>

                      
                  </Link>
                </article>
                ))}
              </section>
                )
                
}
}

export default TasksSection