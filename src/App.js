import './App.css';
import { Container, Stack } from 'react-bootstrap';
import SearchBoxComponent from './component/search-box';
import IpListComponent from './component/ip-list/IpListComponent';
import HeaderComponent from './component/header';

import api from "./api/axios-config";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => await pagination(0, 10))();
  }, []);

  const lookup = async (ipAddress) => {
    await api.get(`/ip-information/lookup/${ipAddress}`)
      .then(response => {
        (async () => await save(response.data))();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }

  const save = async body => {
    await api.post('/ip-information', body)
      .then(response => {
        console.log('response-save', response);
        (async () => await pagination(0, 10))();
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }

  const pagination = async (page, size) => {
    setLoading(true);
    await api.get(`/ip-information?page=${page}&size=${size}&sort=ip,desc`)
      .then(response => {
        console.log('response-pagination', response);
        setLoading(false);
        setTotalRecords(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setData(response.data.content);
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }

  const handleSubmit = (data) => {
    (async () => await lookup(data.ipAddress))();
  }

  return (
    <Container className="py-3">
      <Stack gap={3}>
        <Toaster />
        <div className="d-flex flex-column flex-md-row">
          <HeaderComponent />
          <SearchBoxComponent handle={handleSubmit} />
        </div>

        <IpListComponent
          data={data}
          loading={loading}
          totalPages={totalPages}
          totalRecords={totalRecords} />
      </Stack>
    </Container>
  );
}

export default App;
