import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useScrollbar from "../../hooks/useScrollbar";
import { db } from "../../src/lib/firebase";
import CommentList from "./CommentList";
import { CommentType } from "./LiveType";

const CommentTab = () => {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>([]);
  const scrollBottomRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const scrollstyle = useScrollbar();
  useEffect(() => {
    const commentref = collection(db, `broads/${router.query.live}/comments`);
    const q = query(commentref, orderBy("createdAt", "desc"), limit(30));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (change.newIndex === 0) {
            setComments((prev) => [...prev, todata(change.doc)]);
          } else {
            setComments((prev) => [todata(change.doc), ...prev]);
          }
        }
      });
    });
    return unsubscribe;
  }, [router.query.live]);

  useEffect(() => {
    if (
      scrollBottomRef?.current &&
      containerRef?.current &&
      containerRef.current.scrollHeight -
        containerRef.current.clientHeight -
        containerRef.current.scrollTop <
        35
    ) {
      scrollBottomRef.current.scrollIntoView();
    }
  }, [comments]);

  return (
    <Box
      position="absolute"
      w="100%"
      h="calc(100% - 42px)"
      overflow="auto"
      ref={containerRef}
      css={scrollstyle}
    >
      {comments.map((comment) => (
        <CommentList key={comment.documentId} comment={comment} />
      ))}
      <Box as="div" ref={scrollBottomRef} pb={2} />
    </Box>
  );
};

const todata = (doc: QueryDocumentSnapshot<DocumentData>): CommentType => ({
  commentId: "1",
  documentId: doc.id,
  content: doc.data().content as string,
  uid: doc.data().uid as string,
  createdAt: doc.data().createdAt.seconds as number,
  displayName: doc.data()?.displayName as string,
});
export default CommentTab;
