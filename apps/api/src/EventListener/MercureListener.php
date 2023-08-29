<?php

namespace App\EventListener;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Message;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MercureListener implements EventSubscriberInterface
{
    private $hub;

    public function __construct(HubInterface $hub)
    {
        $this->hub = $hub;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['onMessagePosted', EventPriorities::POST_WRITE],
        ];
    }

    public function onMessagePosted(ViewEvent $event)
    {
        
        $message = $event->getControllerResult();

        if ($message instanceof Message) {

            $update = new Update(
                ('https://api.skillswap.wip/api/messages'),
                json_encode([
                    'id' => $message->getId(),
                    'title' => $message->getTitle(),
                    'content' => $message->getContent(),
                    'createdAt' => $message->getCreatedAt()->format('Y-m-d H:i'),
                    'owner' => '/api/users/'.$message->getOwner()->getSlug()
                ])
            );

            $this->hub->publish($update);
        }
    }
}

