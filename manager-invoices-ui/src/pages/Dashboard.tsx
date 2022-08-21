import axios from 'axios';
import { useQuery } from 'react-query';
import { Header } from '../components/Header';

export function Dashboard() {
  const { data, isFetching } = useQuery('repos', () => {
    const response = await axios.get('https://api.github.com/users/adrianostankewicz/repos')

    return response.data;
  })

  return (
    <h1>Oi</h1>
  )
}