import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './reserveTrip.css';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import ip from '../../../config';

const ReserveTrip = ({ origin, destination, date }) => {
	const [show, setShow] = useState(false);
	const [tripInfo, setTripInfo] = useState({
		path: [],
		hours: [],
		id: ''
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const reserveTrip = async (tripId) => {
		const userId = localStorage.getItem('userId', userId);
		const token = localStorage.getItem('token', token);

		const req = await fetch(`http://${ip}:8080/trips/reserve`, {
			method: 'POST',
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({ userId: userId, tripId: tripId })
		});

		const res = await req.json();

		if (res === undefined) {
			alert('Erro na reserva');
		}

		alert(
			'Reserva concluída com sucesso, irá num veículo com a matrícula: ' +
				res[0]._links.Vehicle['href'].substring(10)
		);
	};

	const location = useLocation();
	const trips = location.state.trips;
	const userOrigin = location.state.origin;
	const userDestination = location.state.destination;
	const userDate = location.state.date;

	const filteredTripsOrigin = [];
	const filteredTripsDestiny = [];
	const filteredTripsDate = [];

	const filterTripsOrigin = trips.map((trip) => {
		trip.path.map((tpath) =>
			tpath === userOrigin ? filteredTripsOrigin.push(trip) : ''
		);
	});

	const filterTripsDestiny = filteredTripsOrigin.map((trip) => {
		trip.path.map((tpath) =>
			tpath === userDestination ? filteredTripsDestiny.push(trip) : ''
		);
	});

	const filterTripsDate = filteredTripsDestiny.filter((trip) =>
		trip.date === userDate ? filteredTripsDate.push(trip) : ''
	);

	let infoToRender;

	if (filteredTripsDate.length > 0) {
		infoToRender = (
			<Container>
				<Table striped borderless hover responsive='xl' width='200px'>
					<thead>
						<tr>
							<th>Origem</th>
							<th>Destino</th>
							<th>Partida</th>
							<th>Chegada</th>
							<th>Preço</th>
							<th>Data</th>
							<th>Detalhe</th>
						</tr>
					</thead>
					<tbody>
						{filteredTripsDate.map((trip) => (
							<tr>
								<td>{trip.path[0]}</td>
								<td>{trip.path[trip.path.length - 1]}</td>
								<td>{trip.hours[0]}</td>
								<td>{trip.hours[trip.hours.length - 1]}</td>
								<td>{trip.price} €</td>
								<td>{trip.date}</td>
								<td>
									<Button
										variant='success'
										onClick={() => {
											handleShow();
											setTripInfo({
												path: trip.path,
												hours: trip.hours,
												id: trip.id
											});
										}}
									>
										+
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		);
	} else {
		infoToRender = (
			<Container>
				<h2>
					Não existem viagens de acordo com os parâmetros introduzidos
				</h2>
			</Container>
		);
	}

	return (
		<div id='tableDiv'>
			{infoToRender}

			<Modal show={show} onHide={handleClose}>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Detalhes</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Table
							striped
							borderless
							hover
							responsive='xl'
							width='200px'
						>
							<thead>
								<tr>
									<th>Paragem</th>
									<th>Hora</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{tripInfo.path.map((p) => (
											<p> {p} </p>
										))}
									</td>
									<td>
										{tripInfo.hours.map((h) => (
											<p> {h} </p>
										))}
									</td>
								</tr>
							</tbody>
						</Table>
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={() => {
								handleClose();
							}}
						>
							Fechar
						</Button>
						<Button
							variant='success'
							onClick={() => {
								reserveTrip(tripInfo.id);
							}}
						>
							Reservar
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal>
		</div>
	);
};

export default ReserveTrip;
