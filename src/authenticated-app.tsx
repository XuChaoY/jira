import React from "react";
import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="ragb(38, 132, 255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Link onClick={logout}>登出</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <Link>Hi, {user?.name}</Link>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(187, 63, 63, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
const Link = styled.span`
  color: #1890ff;
  cursor: pointer;
`;
