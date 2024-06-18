import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import { notification } from 'antd';
import axios from 'axios';
import PointEditModal from '@/components/pointEditModal';
import ClassEditModal from '@/components/classEditModa';
import ThemeCustomization from "@/components/theme";
import MainLayout from "@/components/layout";
import { CircularProgress, Backdrop } from '@mui/material';
import { gameType, dataType } from '@/util/type';
import { APIget, APIpost } from '@/util/api'

const Edit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClassEditModalOpen, setIsClassEditModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const [editPoint, setEditPoint] = useState(0)
  const [editClassPosition, setEditClassPosition] = useState(0)
  const [editClass, setEditClass] = useState(0)
  const [d, sD] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(null)
  const [sidebarData, setSidebarData] = useState<dataType | null>(null)
  const [editGame, setEditGame] = useState<gameType | {}>({})

  const handleOnOpenModal = (p: number) => {
    setEditPoint(p)
    setEditGame(d[`p_${p}`])
    setIsModalOpen(true)
  }

  const onClassEditModalOpen = (p: number, d: number) => {
    setEditClassPosition(p)
    setEditClass(d)
    setIsClassEditModalOpen(true)
  }

  const onUpdate2 = async (p: number, c: number) => {
    setIsLoading(true)

    await APIpost(
      "edit/2",
      { targetPosition: p, insertNumber: c, id: d.id, token: localStorage.getItem("token") },
      () => api.error({ message: 'Faild to update', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
      async () => {
        const res = await APIget(
          `get/match/${page}`,
          () => api.error({ message: 'Faild to get new data', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
          () => {}
        )
        sD(res)
        setIsLoading(false)
        setIsClassEditModalOpen(false)
      }
    )
  }

  // validation実装せなあかんなぁ....
  const onUpdate = async (game: gameType, p: number, isReset: boolean) => {
    setIsLoading(true)

    await APIpost(
      "edit/1",
      { d: game, id: d.id, p: p, token: localStorage.getItem("token") },
      () => api.error({ message: 'Faild to update', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
      async () => {
        const res = await APIget(
          `get/match/${page}`,
          () => api.error({ message: 'Faild to get new data', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
          () => {}
        )
        sD(res)
        setIsLoading(false)
        setIsModalOpen(false)
      }
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await APIget(
        `get/match/${page}`,
        () => api.error({ message: 'Failed to get new data', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
        () => setIsLoading(false)
      )
      sD(res)
    }

    if (page) { fetchData() }
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await APIget(
        "/get/1",
        () => api.error({ message: 'Failed to get new data', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight", className: 'custom-notification' }),
        () => setIsLoading(false)
      )
      setSidebarData(res)
    }

    fetchData()
  }, [])


  return (
    <>
      {d ? <>
        <PointEditModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
          onUpdate={onUpdate}
          editPoint={editPoint}
          // @ts-ignore
          game={editGame}
          setGame={setEditGame}
        />
        <ClassEditModal
          isModalOpen={isClassEditModalOpen}
          setIsModalOpen={setIsClassEditModalOpen}
          isLoading={isLoading}
          onUpdate={onUpdate2}
          editPoint={editClassPosition}
          gread={d.gread}
          defaultClass={editClass}
        /></>
        :
        null}
      <ThemeCustomization>
        <Backdrop
          sx={{ color: '#fff', zIndex: 9999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <MainLayout page={page} setPage={setPage} sidebarData={sidebarData}>
          {d ?
            <div style={{ width: `${30 * 15}px` }}>
              <h3>{d.sex === "male" ? "男" : d.sex === "female" ? "女" : ""}{d.title} ({d.gread}年)</h3>
              {contextHolder}
              <div style={{ position: "relative" }}>
                <Tournament
                  data={d}
                  onModalOpen={handleOnOpenModal}
                  onClassEditModalOpen={onClassEditModalOpen}
                />
              </div>
            </div>
            :
            <h4>編集するクラスを選択</h4>
          }
          <button onClick={async () => {
            const r = await axios.get("http://localhost:3001/token")
            localStorage.setItem("token", r.data.token)
          }}>issue token</button>
        </MainLayout>
      </ThemeCustomization>
    </>
  );

};

export default Edit;
