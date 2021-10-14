import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

const privacy = () => {
  return (
    <Layout title="Wavelet プライバシーポリシー">
      <Box w="600px" mx="auto" my={10} lineHeight={6}>
        <Text as="h1" fontSize="4xl" fontWeight="bold" mb={3}>
          プライバシーポリシー
        </Text>
        <Divider my={4} />
        <H3Text>
          本WebサイトWaveletは、個人情報の取り扱いにおいて、下記のように定めます。
          以下のプライバシーポリシーでは、個人情報の取得・利用・管理について記載しております。サービス利用にあたり、個人情報保護方針をお読みになり、ご理解いただけますと幸いです。
        </H3Text>
        <H2Text>個人情報の取得について</H2Text>
        <H3Text>
          本サイトでは、ユーザーの皆様の個人情報（メールアドレス）を取得させて頂くことがあります。
        </H3Text>
        <H3Text></H3Text>
        <H3Text></H3Text>
        <H3Text></H3Text>
        <H2Text>個人情報の安全管理について</H2Text>
        <H3Text>
          本サイトに投稿された情報はCloud
          Firestoreに保存され、不特定多数のユーザーから閲覧される可能性があります。個人情報や機密情報などの書き込みはしないようにしてください
        </H3Text>
      </Box>
    </Layout>
  );
};

const H2Text = ({ children }: any) => {
  return (
    <Text as="h2" fontSize="2xl" fontWeight="bold" mt={6} mb={3}>
      {children}
    </Text>
  );
};
const H3Text = ({ children }: any) => {
  return (
    <Text as="h3" opacity={0.8}>
      {children}
    </Text>
  );
};
export default privacy;
