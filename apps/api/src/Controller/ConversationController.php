<?php

namespace App\Controller;

use App\Repository\ConversationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ConversationController extends AbstractController
{

    public function __construct(private ConversationRepository $conversationRepository)
    {

    }

    public function __invoke()
    {   
        return $this->conversationRepository->createQueryBuilder('c')
            ->select( 'c.id')
            ->orderBy('c.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getResult();

        // $countIds = $this->conversationRepository->count([]);

        // return ($countIds === 0 || $countIds === null)
        //     ?  "Pas de conversations"
        //     : $countIds;
    }

}