import { Row, Col } from "antd";
import { MetricCard } from "../../components/metricCard";
export const Dashboard = () => {
    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} xl={8}>
                <MetricCard variant="uses" />
            </Col>
            <Col xs={24} sm={24} xl={8}>
                <MetricCard variant="posts" />
            </Col>
            <Col xs={24} sm={24} xl={8}>
                <MetricCard variant="forums" />
            </Col>
        </Row>
    );
};