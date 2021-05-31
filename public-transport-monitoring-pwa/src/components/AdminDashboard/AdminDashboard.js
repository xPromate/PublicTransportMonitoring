import React from 'react';
import { CardDeck, Card, Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Speedometer from '../Speedometer/Speedometer';
import DriversData from './DriversData';
import MethodLogs from './MethodLogs';
import VehiclesData from './VehiclesData';

const AdminDashboard = () => {
	return (
		<Container>
			<CardDeck>
				<Card>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							<DriversData />
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							<Speedometer />
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Veículos mais requisitados</Card.Title>
						<Card.Text>
							<VehiclesData />
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>
							Last updated 3 mins ago
						</small>
						<MethodLogs />
					</Card.Footer>
				</Card>
			</CardDeck>
		</Container>
	);
};

export default AdminDashboard;
