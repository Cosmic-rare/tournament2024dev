import { useSession } from "next-auth/react"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import data from '../data1.json';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';
import { notification } from 'antd';
import axios from 'axios';
import PointEditModal from '@/components/pointEditModal';
import ClassEditModal from '@/components/classEditModa';
import { useRouter } from 'next/router'

export interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
  edit?: number;
}

const App: React.FC = () => {
  const template = _.cloneDeep(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClassEditModalOpen, setIsClassEditModalOpen] = useState(false)
  const [l_point, setL_point] = useState(-1)
  const [h_point, setH_point] = useState(-1)
  const [editPoint, setEditPoint] = useState(0)
  const [editClass, setEditClass] = useState(0)
  const [d, sD] = useState<any>(null)
  const [cells, setCells] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (d !== null) { setCells((p) => draw(d, template)) }
  }, [d])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/match/${router.query.id}`);
        sD(res.data);
      } catch (err) {
        notification.error({ message: 'Failed to get new data', description: 'だめですごめんなさい', duration: 10 });
      }
    };

    if (router.query.id) { fetchData(); }
  }, [router.query.id]);

  const handleOnOpenModal = (p: number) => {
    setEditPoint(p)

    if (d[`p_${p}`]["l_p"] === -1) {
      setL_point(0)
    } else {
      setL_point(d[`p_${p}`]["l_p"])
    }

    if (d[`p_${p}`]["h_p"] === -1) {
      setH_point(0)
    } else {
      setH_point(d[`p_${p}`]["h_p"])
    }

    setIsModalOpen(true)
  }

  const onClassEditModalOpen = (p: number) => {
    setEditClass(p)
    setIsClassEditModalOpen(true)
  }

  const [api, contextHolder] = notification.useNotification();

  const onUpdate2 = (p: number, c: number) => {
    setIsLoading(true)

    axios.post(`/api/edit2`, { targetPosition: p, insertNumber: c, id: d.id })
      .then(() => {
        axios.get(`/api/match/${d.id}`)
          .then((res) => {
            sD(res.data);
          })
          .catch((err) => {
            api.error({ message: 'Faild to get new data', description: 'だめですごめんなさい', duration: 10 });
          })
      })
      .catch((err) => {
        api.error({ message: 'Faild to update', description: 'だめですごめんなさい', duration: 10 });
      })
      .finally(() => { setIsLoading(false); setIsClassEditModalOpen(false) })
  }

  const onUpdate = (p: number, l_p: number, h_p: number, isReset: boolean) => {
    if ((l_p < 0 || h_p < 0) && !isReset) {
      return api.warning({ message: 'Valid', description: 'まいなすはないで', duration: 10 });
    }

    if (l_p === h_p && l_p !== -1) {
      return api.warning({ message: 'Valid', description: 'どうてん無理やで', duration: 10 });
    }

    setIsLoading(true)

    axios.post(`/api/edit`, { l_p: l_p, h_p: h_p, id: d.id, p: p })
      .then(() => {
        axios.get(`/api/match/${d.id}`)
          .then((res) => {
            sD(res.data);
          })
          .catch((err) => {
            api.error({ message: 'Faild to get new data', description: 'だめですごめんなさい', duration: 10 });
          })
      })
      .catch((err) => {
        api.error({ message: 'Faild to update', description: 'だめですごめんなさい', duration: 10 });
      })
      .finally(() => { setIsLoading(false); setIsModalOpen(false) })
  }

  if (d === null) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div style={{ width: `${30 * 15}px` }}>
        <h2>{d.title} ({d.gread}年)</h2>
        {contextHolder}
        <Link href="/edit">edit</Link><br />
        <Link href="/">index</Link>
        <PointEditModal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          isLoading={isLoading} 
          onUpdate={onUpdate} 
          editPoint={editPoint} 
          l_point={l_point} 
          h_point={h_point} 
          setL_point={setL_point} 
          setH_point={setH_point}
        />
        <ClassEditModal 
          isModalOpen={isClassEditModalOpen} 
          setIsModalOpen={setIsClassEditModalOpen} 
          isLoading={isLoading} 
          onUpdate={onUpdate2} 
          editPoint={editClass} 
          gread={d.gread}
        />
        <div style={{ position: "relative" }}>
          <Tournament
            cells={cells}
            onModalOpen={handleOnOpenModal}
            onClassEditModalOpen={onClassEditModalOpen}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      ログインしろorエラーやで
    </>
  )
};

export default App;
