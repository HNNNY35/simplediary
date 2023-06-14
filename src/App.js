import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  // id는 어떤 DOM도 생성하지 않고 0을 가리키고 있음
  const dataId = useRef(0);

  // author, content, emotion은 받아오고 date는 생성하기
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();

    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    // id가 1씩 커지게
    dataId.current += 1;

    // 새로운 아이템을 제일 위에 오게하고 그 뒤에 기존 데이터 스프레드
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    // 리스트에서 id가 targetId가 아닌 것들만 남게 배열 필터링
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // 수정 대상 id와 수정 내용을 받아오는 수정 함수
  const onEdit = (targetId, newContent) => {
    setData(
      // map으로 전체 아이템을 순회하면서 targetId와 id가 일치하는 아이템을 찾음
      // 일치할 경우 기존의 아이템 스프레드 후 content만 새로운 걸로 바꿔줌
      // 일치하지 않을 경우 그냥 기존의 아이템 그대로
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
