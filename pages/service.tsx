import {
  Box,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

const service = () => {
  return (
    <Layout title="Wavelet 利用規約">
      <Box w="600px" mx="auto" my={10} lineHeight={6}>
        <Text as="h1" fontSize="4xl" fontWeight="bold" mb={3}>
          利用規約
        </Text>
        <Text as="h3" opacity={0.8}>
          この利用規約（以下，「本規約」といいます。）は，Wavelet（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆様（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
        </Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第1条（適用）
        </Text>
        <OrderedList opacity={0.8} lineHeight={8}>
          <ListItem>
            本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </ListItem>
          <ListItem>
            当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
          </ListItem>
          <ListItem>
            本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
          </ListItem>
        </OrderedList>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第2条（禁止事項）
        </Text>
        <Text as="h3" opacity={0.8}>
          ユーザーは、本サービスを利用するうえで以下の行為をしてはなりません。
          <UnorderedList lineHeight={8}>
            <ListItem>法令または公序良俗に違反する行為や犯罪行為</ListItem>
            <ListItem>著作権や商標権などの知的財産権を侵害する行為</ListItem>
            <ListItem>
              本サービス、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </ListItem>
            <ListItem>当社のサービスの運営を妨害する行為</ListItem>
            <ListItem>不正アクセスを試みる行為</ListItem>
            <ListItem>
              他のユーザーに関する個人情報等を収集または蓄積する行為
            </ListItem>
            <ListItem>
              本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
            </ListItem>
            <ListItem>不他のユーザーに成りすます行為</ListItem>
            <ListItem>
              当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
            </ListItem>
            <ListItem>その他、当社が不適切と判断する行為</ListItem>
          </UnorderedList>
        </Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第3条（本サービスの提供の変更・停止）
        </Text>
        <Text as="h3" opacity={0.8}>
          本サービスはユーザーに事前に通知することなく提供サービスの内容を変更することができるものとします。
          また、事前の予告なく提供サービスの全部または一部を停止、中断することができるものとします。
        </Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第4条（免責事項）
        </Text>
        <Text as="h3" opacity={0.8}>
          本サービスに起因してユーザーに生じたあらゆる損害について、本サービスに運営者は一切の責任を負いません。
        </Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第5条（利用規約の変更）
        </Text>
        <Text as="h3" opacity={0.8}>
          本サービスの運営者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
        </Text>
        <Text as="h2" fontSize="3xl" fontWeight="bold" mt={6} mb={3}>
          第6条（準拠法・裁判管轄）
        </Text>
        <Text as="h3" opacity={0.8}>
          本規約の解釈にあたっては、日本法を準拠法とします。
          本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </Text>
      </Box>
    </Layout>
  );
};

export default service;
