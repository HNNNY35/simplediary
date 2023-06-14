import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  // 현재 수정중인지 아닌지 불리언 형식
  const [isEdit, setIsEdit] = useState(false);

  // isEdit값을 반대로 변경해주는 토글
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // textarea의 input을 핸들링할 state, 수정되는 내용 담을 것
  // 기본값은 원래 content
  const [localContent, setLocalContent] = useState(content);

  // localContent가 5자 미만일 경우 focus하기 위해 useRef 사용
  const localContentInput = useRef();

  const handleRemove = () => {
    // window.confirm : alret창에 확인, 취소 버튼
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      // 삭제에 해당하는 아이템의 id를 App.js의 onDelete 함수를 호출하면서 파라미터로 전달
      onRemove(id);
    }
  };

  // 수정 취소 시 이벤트
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정 완료 시 이벤트
  const handleEdit = () => {
    // 내용이 5자를 넘지 않으면 수정 불가, focus
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 : {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
