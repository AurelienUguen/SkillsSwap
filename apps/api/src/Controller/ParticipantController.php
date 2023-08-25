<?php

namespace App\Controller;

use App\Repository\ParticipantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ParticipantController extends AbstractController
{
    public function __construct(private ParticipantRepository $participantRepository)
    {

    }

    public function __invoke()
    {   
        return $this->participantRepository->createQueryBuilder('p')
            ->select( 'p.id')
            ->orderBy('p.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getResult();
    }
}
